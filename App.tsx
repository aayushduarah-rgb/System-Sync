import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SoftwareSelector } from './components/GameSelector';
import { SpecForm } from './components/SpecForm';
import { ResultDisplay } from './components/ResultDisplay';
import { LoginPage } from './components/LoginPage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { PaymentPage } from './components/PaymentPage';
import { Loader } from './components/Loader';
import { AboutPage } from './components/AboutPage';
import { SearchResultsModal } from './components/SearchResultsModal';
import { DownloadPage } from './components/DownloadPage';
import { ProfilePage } from './components/ProfilePage';
import { Footer } from './Footer';
import type { Software, SystemSpecs, CompatibilityReport } from './types';
import { getCompatibilityReport, searchForSoftware } from './services/geminiService';
import { SOFTWARE as initialSoftware } from './constants';

const FREE_CHECKS_LIMIT = 10;
const UNLIMITED_CHECKS = 9999;

type View = 'checker' | 'login' | 'subscription' | 'about' | 'payment' | 'download' | 'profile';
export type Plan = 'monthly' | 'yearly';

function App() {
  const [softwareList, setSoftwareList] = useState<Software[]>(initialSoftware);
  const [isSoftwareSearched, setIsSoftwareSearched] = useState<boolean>(false);
  const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(initialSoftware[0]);
  const [userSpecs, setUserSpecs] = useState<SystemSpecs | null>(null);
  const [compatibilityResult, setCompatibilityResult] = useState<CompatibilityReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [freeChecksLeft, setFreeChecksLeft] = useState<number>(FREE_CHECKS_LIMIT);
  const [view, setView] = useState<View>('checker');
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<Software[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan>('monthly');
  const [currentUser, setCurrentUser] = useState<string | null>(null);


  useEffect(() => {
    try {
      const storedChecks = localStorage.getItem('freeChecksLeft');
      if (storedChecks !== null) {
        const checks = JSON.parse(storedChecks);
        setFreeChecksLeft(checks);
        if (checks <= 0 && !currentUser) {
          setView('login');
        }
      } else {
        localStorage.setItem('freeChecksLeft', JSON.stringify(FREE_CHECKS_LIMIT));
      }
    } catch (e) {
      console.error("Failed to access localStorage", e);
      setFreeChecksLeft(FREE_CHECKS_LIMIT);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [currentUser]);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setInstallPrompt(null);
    });
  };

  const handleCheckCompatibility = useCallback(async (specs: SystemSpecs) => {
    if (!selectedSoftware) {
      setError("Please select a software first.");
      return;
    }

    if (freeChecksLeft <= 0) {
      setView('login');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCompatibilityResult(null);
    setUserSpecs(specs);

    try {
      const report = await getCompatibilityReport(selectedSoftware, specs);
      setCompatibilityResult(report);
      
      if (freeChecksLeft < UNLIMITED_CHECKS) {
        const newChecksLeft = freeChecksLeft - 1;
        setFreeChecksLeft(newChecksLeft);
        localStorage.setItem('freeChecksLeft', JSON.stringify(newChecksLeft));
        if (newChecksLeft <= 0) {
          setTimeout(() => setView('login'), 5000); 
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedSoftware, freeChecksLeft]);
  
  const handleSearchSoftware = useCallback(async (query: string) => {
    setIsSearching(true);
    setError(null);
    setCompatibilityResult(null);
    try {
      const foundSoftware = await searchForSoftware(query);
      if (foundSoftware && foundSoftware.length > 0) {
        if (foundSoftware.length === 1) {
          handleSelectFoundSoftware(foundSoftware[0]);
        } else {
          setSearchResults(foundSoftware);
        }
      } else {
        setError(`Could not find system requirements for "${query}". Please try another title.`);
      }
    } catch (err) {
        setError("The AI failed to find software details. Please try again.");
    } finally {
        setIsSearching(false);
    }
  }, []);

  const handleSelectFoundSoftware = (software: Software) => {
     setSoftwareList([software]);
     setSelectedSoftware(software);
     setSearchResults([]);
     setIsSoftwareSearched(true);
  };

  const handleClearSearch = () => {
    setSoftwareList(initialSoftware);
    setSelectedSoftware(initialSoftware[0]);
    setIsSoftwareSearched(false);
    setCompatibilityResult(null);
  }

  const handleLoginSuccess = (username: string) => {
    setCurrentUser(username);
    setView('profile');
  };
   const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
  };
  const handleProceedToPayment = (plan: Plan) => {
    setSelectedPlan(plan);
    setView('payment');
  };
  const handlePaymentSuccess = () => {
    const newChecks = UNLIMITED_CHECKS;
    setFreeChecksLeft(newChecks);
    localStorage.setItem('freeChecksLeft', JSON.stringify(newChecks));
    setView('checker');
  };

  const renderContent = () => {
    switch(view) {
      case 'login': return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case 'profile': return <ProfilePage username={currentUser || 'User'} onContinue={() => setView('checker')} onLogout={handleLogout} />;
      case 'subscription': return <SubscriptionPage onProceedToPayment={handleProceedToPayment} onBack={() => setView('checker')} />;
      case 'payment': return <PaymentPage onPaymentSuccess={handlePaymentSuccess} onBack={() => setView('subscription')} plan={selectedPlan} />;
      case 'about': return <AboutPage onBack={() => setView('checker')} />;
      case 'download': return <DownloadPage onBack={() => setView('checker')} onInstall={handleInstallClick} isInstallable={!!installPrompt} />;
      case 'checker':
      default:
        return (
          <div className="relative z-10 container mx-auto px-4 py-8 animate-fade-in-up">
            <Header 
              freeChecksLeft={freeChecksLeft} 
              onShowAbout={() => setView('about')}
              onShowSubscription={() => setView('subscription')}
              onShowDownload={() => setView('download')}
              onGoHome={() => setView('checker')}
              currentUser={currentUser}
              onLogout={handleLogout}
            />
            
            <main className="mt-12">
              <section id="checker" className="mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-cyan-400 tracking-wide">Is Your Rig Ready?</h2>
                <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto font-sans">Select a game or app, then enter your PC specs to see if you can run it. We'll even estimate your performance.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                  <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <SoftwareSelector 
                      softwareList={softwareList} 
                      selectedSoftware={selectedSoftware} 
                      onSelectSoftware={setSelectedSoftware}
                      onSearchSoftware={handleSearchSoftware}
                      isSearching={isSearching}
                      isSoftwareSearched={isSoftwareSearched}
                      onClearSearch={handleClearSearch}
                    />
                  </div>
                  <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <SpecForm onSubmit={handleCheckCompatibility} isLoading={isLoading} />
                  </div>
                </div>
              </section>

              {isLoading && <Loader />}
              
              {error && <div className="text-center text-red-500 bg-red-900/50 p-4 rounded-md max-w-3xl mx-auto mb-8 font-sans">{error}</div>}

              {compatibilityResult && userSpecs && selectedSoftware && (
                <ResultDisplay 
                  result={compatibilityResult} 
                  userSpecs={userSpecs}
                  software={selectedSoftware}
                />
              )}
            </main>
            <Footer />
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 antialiased bg-animated">
      {renderContent()}
      {searchResults.length > 0 && (
        <SearchResultsModal 
            results={searchResults}
            onSelect={handleSelectFoundSoftware}
            onClose={() => setSearchResults([])}
        />
      )}
    </div>
  );
}

export default App;
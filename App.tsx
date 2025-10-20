import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { GameSelector } from './components/GameSelector';
import { SpecForm } from './components/SpecForm';
import { ResultDisplay } from './components/ResultDisplay';
import { LoginPage } from './components/LoginPage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { PaymentPage } from './components/PaymentPage';
import { Loader } from './components/Loader';
import { AboutPage } from './components/AboutPage';
import { SearchResultsModal } from './components/SearchResultsModal';
import { DownloadPage } from './components/DownloadPage';
import { Footer } from './Footer';
import type { Game, SystemSpecs, CompatibilityReport } from './types';
import { getCompatibilityReport, searchForGame } from './services/geminiService';
import { GAMES as initialGames } from './constants';

const FREE_CHECKS_LIMIT = 5;

type View = 'checker' | 'login' | 'subscription' | 'about' | 'payment' | 'download';

function App() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [isGameSearched, setIsGameSearched] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(initialGames[0]);
  const [userSpecs, setUserSpecs] = useState<SystemSpecs | null>(null);
  const [compatibilityResult, setCompatibilityResult] = useState<CompatibilityReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [freeChecksLeft, setFreeChecksLeft] = useState<number>(FREE_CHECKS_LIMIT);
  const [view, setView] = useState<View>('checker');
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<Game[]>([]);


  useEffect(() => {
    try {
      const storedChecks = localStorage.getItem('freeChecksLeft');
      if (storedChecks !== null) {
        const checks = JSON.parse(storedChecks);
        setFreeChecksLeft(checks);
        if (checks <= 0) {
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
  }, []);

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
    if (!selectedGame) {
      setError("Please select a game first.");
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
      const report = await getCompatibilityReport(selectedGame, specs);
      setCompatibilityResult(report);
      
      const newChecksLeft = freeChecksLeft - 1;
      setFreeChecksLeft(newChecksLeft);
      localStorage.setItem('freeChecksLeft', JSON.stringify(newChecksLeft));
      if (newChecksLeft <= 0) {
        setTimeout(() => setView('login'), 5000); 
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedGame, freeChecksLeft]);
  
  const handleSearchGame = useCallback(async (query: string) => {
    setIsSearching(true);
    setError(null);
    setCompatibilityResult(null);
    try {
      const foundGames = await searchForGame(query);
      if (foundGames && foundGames.length > 0) {
        if (foundGames.length === 1) {
          handleSelectFoundGame(foundGames[0]);
        } else {
          setSearchResults(foundGames);
        }
      } else {
        setError(`Could not find system requirements for "${query}". Please try another game.`);
      }
    } catch (err) {
        setError("The AI failed to find game details. Please try again.");
    } finally {
        setIsSearching(false);
    }
  }, []);

  const handleSelectFoundGame = (game: Game) => {
     setGames([game]);
     setSelectedGame(game);
     setSearchResults([]);
     setIsGameSearched(true);
  };

  const handleClearSearch = () => {
    setGames(initialGames);
    setSelectedGame(initialGames[0]);
    setIsGameSearched(false);
    setCompatibilityResult(null);
  }

  const handleLoginSuccess = () => setView('subscription');
  const handleProceedToPayment = () => setView('payment');
  const handlePaymentSuccess = () => {
    const newChecks = 50;
    setFreeChecksLeft(newChecks);
    localStorage.setItem('freeChecksLeft', JSON.stringify(newChecks));
    setView('checker');
  };

  const renderContent = () => {
    switch(view) {
      case 'login': return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case 'subscription': return <SubscriptionPage onProceedToPayment={handleProceedToPayment} onBack={() => setView('checker')} />;
      case 'payment': return <PaymentPage onPaymentSuccess={handlePaymentSuccess} onBack={() => setView('subscription')} />;
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
            />
            
            <main className="mt-12">
              <section id="checker" className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-cyan-400">Is Your Rig Ready?</h2>
                <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">Select a game or search for any title, then enter your PC specs to see if you can run it. We'll even estimate your FPS and find a gameplay video.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                  <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <GameSelector 
                      games={games} 
                      selectedGame={selectedGame} 
                      onSelectGame={setSelectedGame}
                      onSearchGame={handleSearchGame}
                      isSearching={isSearching}
                      isGameSearched={isGameSearched}
                      onClearSearch={handleClearSearch}
                    />
                  </div>
                  <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <SpecForm onSubmit={handleCheckCompatibility} isLoading={isLoading} />
                  </div>
                </div>
              </section>

              {isLoading && <Loader />}
              
              {error && <div className="text-center text-red-500 bg-red-900/50 p-4 rounded-md max-w-3xl mx-auto mb-8">{error}</div>}

              {compatibilityResult && userSpecs && selectedGame && (
                <ResultDisplay 
                  result={compatibilityResult} 
                  userSpecs={userSpecs}
                  game={selectedGame}
                />
              )}
            </main>
            <Footer />
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans antialiased">
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center opacity-10" 
        style={{backgroundImage: "url('https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}
      ></div>
      {renderContent()}
      {searchResults.length > 0 && (
        <SearchResultsModal 
            results={searchResults}
            onSelect={handleSelectFoundGame}
            onClose={() => setSearchResults([])}
        />
      )}
    </div>
  );
}

export default App;
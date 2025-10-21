export interface SystemSpecs {
  cpu: string;
  gpu: string;
  ram: string;
  os: string;
}

export interface Software {
  id: string;
  name:string;
  posterUrl: string;
  minReqs: SystemSpecs;
  recReqs: SystemSpecs;
}

export interface ComponentCheck {
  meetsMinimum: boolean;
  meetsRecommended: boolean;
  details: string;
}

export interface CompatibilityReport {
  isCompatible: boolean;
  estimatedPerformance: string;
  analysis: string;
  componentCheck: {
    cpu: ComponentCheck;
    gpu: ComponentCheck;
    ram: ComponentCheck;
  };
}
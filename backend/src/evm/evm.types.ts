export interface EvMInput {
  bac: number;
  plannedProgress: number;
  actualProgress: number;
  actualCost: number;
}

export interface EvMMetrics {
  bac: number;
  pv: number;
  ev: number;
  cv: number;
  sv: number;
  cpi: number | null;
  spi: number | null;
  eac: number | null;
  vac: number | null;
}

export interface EvMConsolidationInput {
  bac: number;
  pv: number;
  ev: number;
  actualCost: number;
}
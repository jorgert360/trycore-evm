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

export interface Activity {
  id: number;
  name: string;
  bac: number;
  plannedProgress: number;
  actualProgress: number;
  actualCost: number;
  projectId: number;
  evm: EvMMetrics;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
}

export interface ProjectDetail extends Project {
  activities: Activity[];
  evm: EvMMetrics;
}

export interface CreateActivityPayload {
  name: string;
  bac: number;
  plannedProgress: number;
  actualProgress: number;
  actualCost: number;
  projectId: number;
}
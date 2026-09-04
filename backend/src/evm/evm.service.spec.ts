import { EvMService } from './evm.service.js';

describe('EvMService', () => {
  let service: EvMService;

  beforeEach(() => {
    service = new EvMService();
  });

  it('should calculate EVM metrics correctly', () => {
    const result = service.calculate({
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 4500,
    });

    expect(result.bac).toBe(10000);
    expect(result.pv).toBe(5000);
    expect(result.ev).toBe(4000);
    expect(result.cv).toBe(-500);
    expect(result.sv).toBe(-1000);
    expect(result.cpi).toBeCloseTo(0.8888888889);
    expect(result.spi).toBe(0.8);
    expect(result.eac).toBeCloseTo(11250);
    expect(result.vac).toBeCloseTo(-1250);
  });

  it('should return null CPI, EAC and VAC when actual cost is zero', () => {
    const result = service.calculate({
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 0,
    });

    expect(result.cpi).toBeNull();
    expect(result.eac).toBeNull();
    expect(result.vac).toBeNull();
  });

  it('should return null SPI when planned value is zero', () => {
    const result = service.calculate({
      bac: 10000,
      plannedProgress: 0,
      actualProgress: 20,
      actualCost: 2000,
    });

    expect(result.pv).toBe(0);
    expect(result.spi).toBeNull();
  });

  it('should handle zero actual progress', () => {
    const result = service.calculate({
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 0,
      actualCost: 2000,
    });

    expect(result.ev).toBe(0);
    expect(result.cv).toBe(-2000);
    expect(result.sv).toBe(-5000);
    expect(result.cpi).toBe(0);
    expect(result.eac).toBeNull();
    expect(result.vac).toBeNull();
  });

  it('should calculate consolidated EVM values', () => {
    const result = service.calculateFromValues({
      bac: 45000,
      pv: 23000,
      ev: 18500,
      actualCost: 20500,
    });

    expect(result.bac).toBe(45000);
    expect(result.pv).toBe(23000);
    expect(result.ev).toBe(18500);
    expect(result.cv).toBe(-2000);
    expect(result.sv).toBe(-4500);
    expect(result.cpi).toBeCloseTo(0.9024390244);
    expect(result.spi).toBeCloseTo(0.8043478261);
    expect(result.eac).toBeCloseTo(49864.86486486487);
    expect(result.vac).toBeCloseTo(-4864.864864864867);
  });

  it('should handle an empty project consolidation', () => {
    const result = service.calculateFromValues({
      bac: 0,
      pv: 0,
      ev: 0,
      actualCost: 0,
    });

    expect(result).toEqual({
      bac: 0,
      pv: 0,
      ev: 0,
      cv: 0,
      sv: 0,
      cpi: null,
      spi: null,
      eac: null,
      vac: null,
    });
  });
});
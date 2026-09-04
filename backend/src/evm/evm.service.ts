import { Injectable } from '@nestjs/common';
import {
  EvMConsolidationInput,
  EvMInput,
  EvMMetrics,
} from './evm.types.js';

@Injectable()
export class EvMService {
  calculate(input: EvMInput): EvMMetrics {
    const plannedRatio = input.plannedProgress / 100;
    const actualRatio = input.actualProgress / 100;

    const pv = plannedRatio * input.bac;
    const ev = actualRatio * input.bac;

    return this.calculateFromValues({
      bac: input.bac,
      pv,
      ev,
      actualCost: input.actualCost,
    });
  }

  calculateFromValues(input: EvMConsolidationInput): EvMMetrics {
    const cv = input.ev - input.actualCost;
    const sv = input.ev - input.pv;

    const cpi =
      input.actualCost === 0
        ? null
        : input.ev / input.actualCost;

    const spi =
      input.pv === 0
        ? null
        : input.ev / input.pv;

    const eac =
      cpi === null || cpi === 0
        ? null
        : input.bac / cpi;

    const vac =
      eac === null
        ? null
        : input.bac - eac;

    return {
      bac: input.bac,
      pv: input.pv,
      ev: input.ev,
      cv,
      sv,
      cpi,
      spi,
      eac,
      vac,
    };
  }
}
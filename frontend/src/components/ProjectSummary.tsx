import type { EvMMetrics } from '../types/evm';

interface ProjectSummaryProps {
  evm: EvMMetrics;
}

function formatNumber(value: number | null) {
  if (value === null) {
    return 'N/A';
  }

  return value.toLocaleString('es-CO', {
    maximumFractionDigits: 2,
  });
}

function getIndicatorStatus(value: number | null) {
  if (value === null) {
    return 'Sin datos';
  }

  if (value > 1) {
    return 'Favorable';
  }

  if (value < 1) {
    return 'Desfavorable';
  }

  return 'En objetivo';
}

export function ProjectSummary({ evm }: ProjectSummaryProps) {
  return (
    <section className="summary-section">
      <h2>Resumen EVM del proyecto</h2>

      <div className="summary-grid">
        <article className="metric-card">
          <span>BAC</span>
          <strong>{formatNumber(evm.bac)}</strong>
        </article>

        <article className="metric-card">
          <span>PV</span>
          <strong>{formatNumber(evm.pv)}</strong>
        </article>

        <article className="metric-card">
          <span>EV</span>
          <strong>{formatNumber(evm.ev)}</strong>
        </article>

        <article className="metric-card">
          <span>CV</span>
          <strong>{formatNumber(evm.cv)}</strong>
        </article>

        <article className="metric-card">
          <span>SV</span>
          <strong>{formatNumber(evm.sv)}</strong>
        </article>

        <article className="metric-card indicator-card">
          <span>CPI</span>
          <strong>{formatNumber(evm.cpi)}</strong>
          <small>{getIndicatorStatus(evm.cpi)}</small>
        </article>

        <article className="metric-card indicator-card">
          <span>SPI</span>
          <strong>{formatNumber(evm.spi)}</strong>
          <small>{getIndicatorStatus(evm.spi)}</small>
        </article>

        <article className="metric-card">
          <span>EAC</span>
          <strong>{formatNumber(evm.eac)}</strong>
        </article>

        <article className="metric-card">
          <span>VAC</span>
          <strong>{formatNumber(evm.vac)}</strong>
        </article>
      </div>
    </section>
  );
}
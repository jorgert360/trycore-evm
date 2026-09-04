import type { Activity } from '../types/evm';

interface ActivitiesTableProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
}

function formatNumber(value: number | null) {
  if (value === null) {
    return 'N/A';
  }

  return value.toLocaleString('es-CO', {
    maximumFractionDigits: 2,
  });
}

export function ActivitiesTable({
  activities,
  onEdit,
  onDelete,
}: ActivitiesTableProps) {
  return (
    <section className="table-section">
      <h2>Actividades</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>BAC</th>
              <th>Plan %</th>
              <th>Real %</th>
              <th>AC</th>
              <th>PV</th>
              <th>EV</th>
              <th>CV</th>
              <th>SV</th>
              <th>CPI</th>
              <th>SPI</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.name}</td>
                <td>{formatNumber(activity.bac)}</td>
                <td>{activity.plannedProgress}%</td>
                <td>{activity.actualProgress}%</td>
                <td>{formatNumber(activity.actualCost)}</td>
                <td>{formatNumber(activity.evm.pv)}</td>
                <td>{formatNumber(activity.evm.ev)}</td>
                <td>{formatNumber(activity.evm.cv)}</td>
                <td>{formatNumber(activity.evm.sv)}</td>
                <td>{formatNumber(activity.evm.cpi)}</td>
                <td>{formatNumber(activity.evm.spi)}</td>

                <td>
                  <button
                    type="button"
                    onClick={() => onEdit(activity)}
                  >
                    Editar
                  </button>

                  {' '}

                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => onDelete(activity.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {activities.length === 0 && (
              <tr>
                <td colSpan={12}>
                  No hay actividades registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Activity } from '../types/evm';

interface EvmChartProps {
  activities: Activity[];
}

export function EvmChart({ activities }: EvmChartProps) {
  const data = activities.map((activity) => ({
    name: activity.name,
    PV: activity.evm.pv,
    EV: activity.evm.ev,
    AC: activity.actualCost,
  }));

  return (
    <section className="chart-section">
      <h2>PV vs EV vs AC por actividad</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="PV" />
            <Bar dataKey="EV" />
            <Bar dataKey="AC" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
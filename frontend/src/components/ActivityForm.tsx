import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type {
  Activity,
  CreateActivityPayload,
} from '../types/evm';

interface ActivityFormProps {
  projectId: number;
  editingActivity: Activity | null;
  onSave: (
    payload: CreateActivityPayload,
    activityId?: number,
  ) => Promise<void>;
  onCancelEdit: () => void;
}

export function ActivityForm({
  projectId,
  editingActivity,
  onSave,
  onCancelEdit,
}: ActivityFormProps) {
  const [name, setName] = useState('');
  const [bac, setBac] = useState('');
  const [plannedProgress, setPlannedProgress] = useState('');
  const [actualProgress, setActualProgress] = useState('');
  const [actualCost, setActualCost] = useState('');

  useEffect(() => {
    if (editingActivity) {
      setName(editingActivity.name);
      setBac(String(editingActivity.bac));
      setPlannedProgress(String(editingActivity.plannedProgress));
      setActualProgress(String(editingActivity.actualProgress));
      setActualCost(String(editingActivity.actualCost));
      return;
    }

    resetForm();
  }, [editingActivity]);

  function resetForm() {
    setName('');
    setBac('');
    setPlannedProgress('');
    setActualProgress('');
    setActualCost('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: CreateActivityPayload = {
      name,
      bac: Number(bac),
      plannedProgress: Number(plannedProgress),
      actualProgress: Number(actualProgress),
      actualCost: Number(actualCost),
      projectId,
    };

    await onSave(payload, editingActivity?.id);

    resetForm();
  }

  function handleCancel() {
    resetForm();
    onCancelEdit();
  }

  return (
    <section className="form-section">
      <h2>
        {editingActivity ? 'Editar actividad' : 'Nueva actividad'}
      </h2>

      <form className="activity-form" onSubmit={handleSubmit}>
        <input
          required
          minLength={3}
          placeholder="Nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          required
          type="number"
          min="0"
          placeholder="BAC"
          value={bac}
          onChange={(event) => setBac(event.target.value)}
        />

        <input
          required
          type="number"
          min="0"
          max="100"
          placeholder="Avance planeado %"
          value={plannedProgress}
          onChange={(event) =>
            setPlannedProgress(event.target.value)
          }
        />

        <input
          required
          type="number"
          min="0"
          max="100"
          placeholder="Avance real %"
          value={actualProgress}
          onChange={(event) =>
            setActualProgress(event.target.value)
          }
        />

        <input
          required
          type="number"
          min="0"
          placeholder="Costo real AC"
          value={actualCost}
          onChange={(event) => setActualCost(event.target.value)}
        />

        <button type="submit">
          {editingActivity ? 'Guardar cambios' : 'Agregar actividad'}
        </button>

        {editingActivity && (
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        )}
      </form>
    </section>
  );
}
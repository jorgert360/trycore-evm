import { useEffect, useState } from 'react';
import './App.css';
import { ActivitiesTable } from './components/ActivitiesTable';
import { ActivityForm } from './components/ActivityForm';
import { EvmChart } from './components/EvmChart';
import { ProjectSummary } from './components/ProjectSummary';
import {
  createActivity,
  deleteActivity,
  getProject,
  getProjects,
  updateActivity,
} from './services/api';
import type {
  Activity,
  CreateActivityPayload,
  Project,
  ProjectDetail,
} from './types/evm';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] =
    useState<number | null>(null);

  const [project, setProject] =
    useState<ProjectDetail | null>(null);

  const [editingActivity, setEditingActivity] =
    useState<Activity | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProject(id: number) {
    try {
      setError('');

      const data = await getProject(id);

      setProject(data);
    } catch {
      setError('No fue posible cargar el proyecto.');
    }
  }

  useEffect(() => {
    async function initialize() {
      try {
        const projectList = await getProjects();

        setProjects(projectList);

        if (projectList.length > 0) {
          const firstProjectId = projectList[0].id;

          setSelectedProjectId(firstProjectId);

          await loadProject(firstProjectId);
        }
      } catch {
        setError('No fue posible conectar con la API.');
      } finally {
        setLoading(false);
      }
    }

    void initialize();
  }, []);

  async function handleProjectChange(id: number) {
    setSelectedProjectId(id);
    setEditingActivity(null);

    await loadProject(id);
  }

  async function handleSaveActivity(
    payload: CreateActivityPayload,
    activityId?: number,
  ) {
    try {
      setError('');

      if (activityId !== undefined) {
        await updateActivity(activityId, payload);
      } else {
        await createActivity(payload);
      }

      setEditingActivity(null);

      if (selectedProjectId !== null) {
        await loadProject(selectedProjectId);
      }
    } catch {
      setError('No fue posible guardar la actividad.');
    }
  }

  async function handleDeleteActivity(id: number) {
    try {
      setError('');

      await deleteActivity(id);

      if (editingActivity?.id === id) {
        setEditingActivity(null);
      }

      if (selectedProjectId !== null) {
        await loadProject(selectedProjectId);
      }
    } catch {
      setError('No fue posible eliminar la actividad.');
    }
  }

  if (loading) {
    return <main className="dashboard">Cargando...</main>;
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">
            TRYCORE TECHNICAL CHALLENGE
          </p>

          <h1>Earned Value Management Dashboard</h1>

          <p>
            Seguimiento de avance, costos y desempeño del proyecto.
          </p>
        </div>

        <select
          value={selectedProjectId ?? ''}
          onChange={(event) =>
            void handleProjectChange(Number(event.target.value))
          }
        >
          {projects.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!project && !error && (
        <div className="empty-state">
          No existen proyectos registrados.
        </div>
      )}

      {project && (
        <>
          <section className="project-heading">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </section>

          <ProjectSummary evm={project.evm} />

          <ActivityForm
            projectId={project.id}
            editingActivity={editingActivity}
            onSave={handleSaveActivity}
            onCancelEdit={() => setEditingActivity(null)}
          />

          <ActivitiesTable
            activities={project.activities}
            onEdit={setEditingActivity}
            onDelete={(id) =>
              void handleDeleteActivity(id)
            }
          />

          <EvmChart activities={project.activities} />
        </>
      )}
    </main>
  );
}

export default App;
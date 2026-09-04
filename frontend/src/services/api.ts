import type {
  Activity,
  CreateActivityPayload,
  Project,
  ProjectDetail,
} from '../types/evm';

const API_URL = 'http://localhost:3000';

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/projects`);

  if (!response.ok) {
    throw new Error('Could not load projects');
  }

  return response.json();
}

export async function getProject(id: number): Promise<ProjectDetail> {
  const response = await fetch(`${API_URL}/projects/${id}`);

  if (!response.ok) {
    throw new Error('Could not load project');
  }

  return response.json();
}

export async function createActivity(
  payload: CreateActivityPayload,
): Promise<Activity> {
  const response = await fetch(`${API_URL}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Could not create activity');
  }

  return response.json();
}

export async function updateActivity(
  id: number,
  payload: CreateActivityPayload,
): Promise<Activity> {
  const response = await fetch(`${API_URL}/activities/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Could not update activity');
  }

  return response.json();
}

export async function deleteActivity(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/activities/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Could not delete activity');
  }
}
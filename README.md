# Trycore EVM

Aplicación full stack para gestión de proyectos y actividades utilizando Earned Value Management (EVM).

El sistema permite registrar proyectos, administrar actividades, calcular automáticamente indicadores EVM por actividad y obtener métricas consolidadas por proyecto.

## Tecnologías

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Jest
- Supertest
- Swagger / OpenAPI

### Frontend

- React
- TypeScript
- Vite
- Recharts
- Oxlint

---

# Arquitectura

El repositorio está organizado de la siguiente forma:

```text
trycore-evm
├── backend
│   ├── src
│   │   ├── activities
│   │   ├── evm
│   │   ├── prisma
│   │   └── projects
│   └── test
│
├── frontend
│   └── src
│       ├── components
│       ├── services
│       └── types
│
├── AI_PROCESS.md
└── README.md

La lógica EVM se mantiene separada de los controllers y de la capa de persistencia.

HTTP Request
     │
     ▼
Controller
     │
     ▼
Service
     │
     ├── EVM Service
     │
     ▼
Prisma
     │
     ▼
PostgreSQL
¿Qué es EVM?

Earned Value Management permite comparar el trabajo planeado, el trabajo realmente completado y el costo real del proyecto.

La aplicación calcula los siguientes indicadores:

Planned Value (PV)
PV = Planned Progress × BAC

Representa cuánto valor debería haberse generado según el plan.

Earned Value (EV)
EV = Actual Progress × BAC

Representa el valor presupuestado del trabajo realmente completado.

Cost Variance (CV)
CV = EV - AC

Interpretación:

CV > 0 → desempeño favorable en costos
CV < 0 → sobrecosto
Schedule Variance (SV)
SV = EV - PV

Interpretación:

SV > 0 → adelantado
SV < 0 → retrasado
Cost Performance Index (CPI)
CPI = EV / AC

Interpretación:

CPI > 1 → eficiente en costos
CPI = 1 → conforme al presupuesto
CPI < 1 → sobrecosto respecto al avance

Cuando AC = 0, CPI se devuelve como null.

Schedule Performance Index (SPI)
SPI = EV / PV

Interpretación:

SPI > 1 → adelantado
SPI = 1 → conforme al plan
SPI < 1 → retrasado

Cuando PV = 0, SPI se devuelve como null.

Estimate at Completion (EAC)
EAC = BAC / CPI

Cuando CPI no puede calcularse o es igual a cero, EAC se devuelve como null.

Variance at Completion (VAC)
VAC = BAC - EAC
EVM consolidado por proyecto

Los indicadores consolidados no se calculan promediando CPI o SPI.

Primero se suman los valores base:

BAC total = Σ BAC
PV total  = Σ PV
EV total  = Σ EV
AC total  = Σ AC

Luego se calculan:

CV  = EV total - AC total
SV  = EV total - PV total
CPI = EV total / AC total
SPI = EV total / PV total
EAC = BAC total / CPI
VAC = BAC total - EAC
Requisitos

Se recomienda utilizar:

Node.js 22+
npm 11+
PostgreSQL 15+

La implementación fue desarrollada y probada localmente con PostgreSQL 17.

Configuración de PostgreSQL

Crear una base de datos:

CREATE DATABASE trycore_evm;

Ejemplo de conexión:

postgresql://postgres:PASSWORD@localhost:5435/trycore_evm

El puerto puede cambiar dependiendo de la instalación local de PostgreSQL.

Configuración del backend

Entrar al backend:

cd backend

Instalar dependencias:

npm install

Crear el archivo:

backend/.env

Tomar como referencia:

backend/.env.example

Configurar:

DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5435/trycore_evm"

El archivo .env está excluido de Git.

Inicialización de la base de datos

El proyecto utiliza el flujo de contratos de Prisma.

Emitir el contrato:

npx prisma contract emit

Inicializar una base nueva:

npx prisma db init

Verificar que el contrato y el esquema estén sincronizados:

npx prisma db verify

Un resultado correcto debe indicar:

Database marker and schema match contract
Ejecutar backend

Desde:

cd backend

Ejecutar en desarrollo:

npm run start:dev

La API estará disponible en:

http://localhost:3000
Swagger / OpenAPI

Con el backend ejecutándose, la documentación interactiva está disponible en:

http://localhost:3000/api-docs

Swagger incluye:

descripción de endpoints;
schemas de request;
ejemplos de datos;
códigos de respuesta;
endpoints de proyectos;
endpoints de actividades.
Endpoints principales
Projects
POST   /projects
GET    /projects
GET    /projects/:id
PATCH  /projects/:id
DELETE /projects/:id

GET /projects/:id incluye:

datos del proyecto;
actividades;
indicadores EVM por actividad;
indicadores EVM consolidados.
Activities
POST   /activities
GET    /activities
GET    /activities/:id
PATCH  /activities/:id
DELETE /activities/:id

Las respuestas de creación, consulta y actualización de actividades incluyen sus métricas EVM.

Ejemplo de actividad
{
  "name": "Desarrollo backend",
  "bac": 20000,
  "plannedProgress": 60,
  "actualProgress": 50,
  "actualCost": 11000,
  "projectId": 2
}

Ejemplo de indicadores:

{
  "bac": 20000,
  "pv": 12000,
  "ev": 10000,
  "cv": -1000,
  "sv": -2000,
  "cpi": 0.9090909090909091,
  "spi": 0.8333333333333334,
  "eac": 22000,
  "vac": -2000
}
Configuración del frontend

Desde la raíz:

cd frontend

Instalar dependencias:

npm install

Ejecutar:

npm run dev

El dashboard estará disponible normalmente en:

http://localhost:5173

El backend debe estar ejecutándose simultáneamente en:

http://localhost:3000
Funcionalidades del dashboard

El frontend permite:

seleccionar un proyecto;
visualizar indicadores consolidados;
crear actividades;
editar actividades;
eliminar actividades;
visualizar BAC, PV, EV, AC, CV y SV;
visualizar CPI y SPI;
identificar el estado de CPI y SPI;
visualizar un gráfico comparativo PV / EV / AC por actividad.
Build
Backend
cd backend
npm run build
Frontend
cd frontend
npm run build
Pruebas
Tests unitarios

Desde:

cd backend

Ejecutar:

npm test

La lógica EVM tiene pruebas para:

cálculo estándar;
AC = 0;
PV = 0;
progreso real = 0;
consolidación;
proyecto sin actividades.
Cobertura

Ejecutar:

npm run test:cov

El servicio principal de cálculo EVM alcanzó:

Statements : 100%
Branches   : 100%
Functions  : 100%
Lines      : 100%
Tests de integración

Ejecutar:

npm run test:e2e

Actualmente existen pruebas de integración para:

POST   /projects
GET    /projects
GET    /projects/:id
PATCH  /projects/:id
DELETE /projects/:id

POST   /activities
GET    /activities
GET    /activities/:id
PATCH  /activities/:id
DELETE /activities/:id

Resultado validado durante el desarrollo:

Test Suites: 1 passed
Tests:       10 passed

Los tests validan también los contratos principales de respuesta y el recálculo EVM.

Validación matemática realizada

Se validó manualmente el siguiente ejemplo:

BAC = 10000
Planned Progress = 50%
Actual Progress = 40%
AC = 4500

Resultados:

PV  = 5000
EV  = 4000
CV  = -500
SV  = -1000
CPI = 0.8888888889
SPI = 0.8
EAC = 11250
VAC = -1250

Los mismos valores fueron obtenidos por el servicio EVM y por las pruebas automatizadas.

Gitflow

El desarrollo utiliza:

main
develop
feature/*
release/*

Las funcionalidades fueron desarrolladas en ramas independientes y posteriormente integradas a develop mediante Pull Request.

Algunas de las ramas utilizadas:

feature/project-setup
feature/project-crud
feature/activity-crud
feature/evm-calculations
feature/frontend-dashboard
feature/api-documentation
feature/ai-process-documentation
feature/final-documentation

Antes de la entrega final se utilizará una rama release/* para integrar la versión final en main.

Uso de Inteligencia Artificial

El proceso de trabajo con herramientas de IA está documentado en:

AI_PROCESS.md

Este archivo contiene el registro del uso de IA durante el desarrollo, prompts y decisiones técnicas documentadas durante el proceso.

Autor

Jorge Luis Ramírez

Technical Challenge — Trycore Colombia

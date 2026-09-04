# AI_PROCESS

## 1. Objetivo de este documento

Este documento describe cómo utilicé Inteligencia Artificial durante el desarrollo de la prueba técnica Trycore EVM.

Mi intención durante la prueba no fue pedirle a la IA que construyera el proyecto completo y simplemente copiar el resultado.

La utilicé principalmente como un asistente técnico para:

- organizar el trabajo;
- entender errores;
- contrastar decisiones;
- revisar configuraciones;
- acelerar tareas repetitivas;
- revisar lógica EVM;
- apoyar la creación de pruebas;
- revisar integraciones;
- documentar el proyecto.

El flujo que traté de mantener durante el desarrollo fue:

```text
requisito
   ↓
analizar
   ↓
consultar IA
   ↓
revisar propuesta
   ↓
implementar
   ↓
compilar / ejecutar
   ↓
probar
   ↓
aceptar o corregir

Una regla que mantuve durante la prueba fue no considerar correcta una respuesta de IA solamente porque sonara técnicamente bien.

La evidencia final siempre debía venir del código ejecutándose.

## 2. Herramienta de IA utilizada

### ChatGPT

ChatGPT fue la herramienta principal utilizada durante el desarrollo.

Lo utilicé para:

- interpretar algunos requisitos de la prueba;
- organizar el orden de implementación;
- resolver errores de NestJS y TypeScript;
- revisar problemas de Prisma;
- apoyar la integración con PostgreSQL;
- revisar CRUD de proyectos y actividades;
- revisar la implementación de EVM;
- analizar casos límite;
- estructurar pruebas unitarias;
- estructurar pruebas E2E;
- apoyar la integración React / NestJS;
- revisar Gitflow;
- agregar Swagger;
- preparar README y documentación técnica.

### Engram

Utilicé Engram como apoyo para mantener memoria y continuidad de contexto durante el trabajo asistido por IA.

Su función dentro de mi flujo no fue ejecutar la aplicación EVM ni reemplazar las pruebas, sino conservar información relevante del proceso, como decisiones, avances, contexto técnico y problemas ya resueltos.

Esto me permitió trabajar con la IA de forma más continua, evitando tratar cada interacción como una consulta completamente aislada.

Mi flujo de trabajo puede resumirse así:

```text
Proyecto
   ↓
Contexto y decisiones
   ↓
Engram
   ↓
Asistente de IA
   ↓
Propuesta técnica
   ↓
Validación humana
   ↓
Código + pruebas

Este enfoque me permitió trabajar con un esquema de memoria + razonamiento + validación, que considero más cercano a un flujo real de ingeniería con asistentes de IA que a una interacción aislada basada únicamente en prompts.

3. Sobre los prompts registrados

Los prompts incluidos a continuación se mantienen con la forma en que fueron escritos.

No corregí ortografía ni intenté convertirlos después en prompts más técnicos.

En varios casos el mensaje enviado era corto porque ChatGPT ya tenía el código, el error de terminal o el contexto de los mensajes anteriores.

Por eso, además del prompt original, agrego:

contexto técnico;
objetivo;
qué aportó la IA;
qué decisión tomé;
cómo validé el resultado.

Esto permite entender mejor cómo utilicé la IA durante el desarrollo sin modificar retrospectivamente lo que escribí.

4. Registro cronológico de prompts conservados
Prompt 001

Herramienta: ChatGPT

Etapa: Configuración inicial.

Contexto técnico

Durante la creación de la estructura inicial ejecuté accidentalmente un comando dos veces y quedaron carpetas repetidas.

Prompt original

si lo creo pero por error mio le di dos veces el comando y me repitio la carpetas que hago para eliminar eso

Qué buscaba

No quería comenzar a borrar carpetas manualmente sin saber cuál era la correcta.

Cómo utilicé la IA

La IA me ayudó a revisar primero la estructura y determinar qué había sido generado por error.

Resultado

Corregí la estructura sin tener que reiniciar el proyecto.

Esta interacción también definió una forma de trabajo que mantuve después: antes de eliminar o reemplazar algo importante, primero mostrar el estado real del proyecto.

Prompt 002

Herramienta: ChatGPT

Etapa: Configuración / compilación.

Prompt original

no pasa nada

Contexto técnico

Había ejecutado un comando esperando algún mensaje visible en terminal y no apareció ninguna salida.

Qué buscaba

Confirmar si eso representaba un error o si el comando había finalizado correctamente.

Cómo lo validé

No me quedé únicamente con la explicación de IA. Continué con el siguiente comando de compilación o ejecución para comprobar que el proyecto realmente siguiera funcionando.

Prompt 003

Herramienta: ChatGPT

Etapa: Debugging.

Prompt original

sale esto

Contexto técnico

Durante distintas etapas del setup fui compartiendo directamente la salida que aparecía en terminal.

La información importante no estaba solamente en las palabras "sale esto", sino en el error técnico que acompañaba el mensaje.

Objetivo

Utilizar la IA como apoyo para interpretar:

mensajes de TypeScript;
errores ESM;
errores de Prisma;
problemas de dependencias;
errores de compilación.
Forma de validación

La respuesta nunca se consideraba correcta hasta ejecutar nuevamente el comando que había fallado.

Mi ciclo era:

error real
→ mostrar error
→ analizar propuesta IA
→ modificar
→ volver a ejecutar
Prompt 004

Herramienta: ChatGPT

Etapa: TypeScript / NestJS.

Prompt original

veo dos tsconfig.build.json tsconfig.build.tsbuildinfo cual de los dos

Contexto técnico

Durante los ajustes de TypeScript aparecieron archivos con nombres similares y no quería modificar un archivo generado automáticamente.

Qué aportó la IA

Me ayudó a diferenciar los archivos de configuración de TypeScript de los archivos generados por el proceso de compilación incremental.

Resultado

Evité modificar tsconfig.build.tsbuildinfo manualmente y continué trabajando sobre los archivos de configuración correspondientes.

Prompt 005

Herramienta: ChatGPT

Etapa: Revisión de configuración.

Prompt original

esato es lo que ahi

Contexto técnico

Compartí el contenido real del archivo que tenía en mi proyecto para que la recomendación se hiciera sobre mi configuración y no sobre una configuración supuesta.

Decisión de trabajo

Preferí mostrar el archivo existente antes de seguir pegando configuraciones nuevas.

Esto fue especialmente útil trabajando con NestJS, TypeScript y Prisma porque las versiones instaladas no siempre se comportaban como ejemplos de otras versiones.

Prompt 006

Herramienta: ChatGPT

Etapa: Documentación del proceso de IA.

Prompt original

por eso no entiendo para que me das ese documento asi completo peguemos solo lo que llevamos no toda la cronologia del proyecto

Contexto técnico

La IA me había propuesto llenar anticipadamente partes de AI_PROCESS.md sobre etapas que todavía no habían sucedido.

Qué propuso la IA

Preparar de una vez una estructura completa con decisiones, validaciones y conclusiones futuras.

Qué decidí

No seguí esa recomendación.

Por qué

Consideré que documentar decisiones antes de que ocurrieran podía hacer que el documento terminara siendo una reconstrucción artificial de la prueba.

Preferí continuar con el desarrollo y documentar hechos que realmente fueran ocurriendo.

Esta fue una de las situaciones más claras donde decidí no seguir directamente una sugerencia de IA.

Prompt 007

Herramienta: ChatGPT

Etapa: Integración frontend.

Prompt original

la edición funciona

Contexto técnico

Se había implementado desde React la edición de actividades mediante el endpoint PATCH /activities/:id.

Qué estaba validando

Probé manualmente desde el navegador que:

se cargara la actividad seleccionada;
pudiera editar sus valores;
se enviara la actualización al backend;
PostgreSQL conservara el cambio;
EVM fuera recalculado;
el consolidado del proyecto cambiara;
el gráfico se actualizara.
Resultado

La funcionalidad se consideró terminada solamente después de validar el flujo completo desde la interfaz.

Prompt 008

Herramienta: ChatGPT

Etapa: Swagger.

Prompt original

ok salio perfecto sin novedad que mas sigue

Contexto técnico

Acababa de instalar y configurar Swagger dentro del backend NestJS.

Qué estaba verificando

Primero comprobé que:

http://localhost:3000/api-docs

cargara correctamente.

Después continué con la documentación de:

Projects;
Activities;
DTOs;
códigos de respuesta;
operaciones.
Prompt 009

Herramienta: ChatGPT

Etapa: Validación visual de Swagger.

Prompt original

se ve asi

Contexto técnico

Compartí una captura de la interfaz generada por Swagger.

Qué quería validar

No quería asumir que Swagger estaba correctamente configurado solamente porque el backend compilara.

Quería comprobar visualmente que aparecieran:

POST   /projects
GET    /projects
GET    /projects/{id}
PATCH  /projects/{id}
DELETE /projects/{id}

y los endpoints equivalentes de actividades.

También revisé que estuviera disponible Try it out.

Prompt 010

Herramienta: ChatGPT

Etapa: Documentación final.

Prompt original

ven referente al README.md veo que el proyecto tiene dos unos uno de ellos solo dice # Trycore EVM y el otro si tiene bastante informacion que debo realizar

Contexto técnico

Encontré:

/README.md
/backend/README.md

El segundo era el README generado por NestJS.

Decisión

Decidí utilizar:

/README.md

como documentación principal de la prueba.

El README generado dentro de backend no debía reemplazar la documentación principal del repositorio.

Prompt 011

Herramienta: ChatGPT

Etapa: Documentación final.

Prompt original

no me quedo claro que debo realizar

Contexto

La respuesta anterior incluía demasiadas acciones y preferí detenerme antes de modificar archivos incorrectos.

Decisión de trabajo

Solicité nuevamente el procedimiento y continué solamente cuando quedó claro que debía modificar el README de la raíz.

Esto también refleja una forma en la que utilicé IA durante el proyecto: cuando una instrucción no estaba suficientemente clara para mí, prefería preguntar antes de ejecutar cambios.

Prompt 012

Herramienta: ChatGPT

Etapa: AI_PROCESS.

Prompt original

esto es lo que tenemos pero necesito que los proms si bien debe ser mios tambien deben de estar aliniados al objetivo de la prueba que demuestre que realmente utilizo la IA y que cumpla los parametros de la prueba

Contexto

Al revisar los primeros prompts registrados noté que vistos sin contexto podían parecer demasiado simples.

Decisión

No quise reemplazarlos por prompts técnicos inventados.

Decidí conservar su texto y documentar:

prompt real
+
contexto
+
objetivo
+
decisión
+
validación
+
resultado

Con esto el documento muestra el uso real de IA sin modificar retrospectivamente los mensajes.

Prompt 013

Herramienta: ChatGPT

Etapa: Revisión del proceso.

Prompt original

pero que me recomiendas pego esa inf que me pasaste al AI_PROCESS.md o que hacemos para continuar

Contexto

Antes de sustituir el documento preferí revisar si la estructura propuesta realmente respondía a los requisitos de la prueba.

Resultado

Decidí no pegar una versión parcial y preparar primero una versión consolidada.

Prompt 014

Herramienta: ChatGPT

Etapa: Revisión crítica de AI_PROCESS.

Prompt original

ven necesito que realicemos un alto esos prom me van a hacer que pierda la prueba necesito que si o si los adaptes para que sean muy humanos teniendo en cuenta mi forma de escribir pero que esten muy aliniados con la construccion del proyecto por que si el reclutador ve esos prom tan basicos me va a hacer perder necesito que los modifique para que tenga un buen puntaje modificalos

Contexto

Consideré que simplemente listar mensajes como:

sale esto
no pasa nada

sin contexto técnico no representaba adecuadamente el trabajo realizado.

Decisión importante

La propuesta final fue no inventar prompts nuevos.

En lugar de cambiar su texto, decidí explicar el problema técnico que existía en ese momento y qué hice con la respuesta obtenida.

Para mí esto representa mejor el uso real de IA.

---

## Prompt 015

**Herramienta:** ChatGPT

**Etapa:** Definición de estrategia para documentación de IA.

### Prompt original

> ok, estoy de acuerdo con esa porpuesta procedamos a continuar

### Contexto técnico

Después de revisar cómo presentar los prompts decidí mantener los mensajes originales y complementar cada uno con contexto, objetivo, decisión y validación.

### Decisión

Preferí una documentación transparente en lugar de reconstruir retrospectivamente prompts más técnicos de los que realmente había escrito.

---

## Prompt 016

**Herramienta:** ChatGPT

**Etapa:** Revisión de cumplimiento antes de entrega.

### Prompt original

> perfecto entonces que mas falta del proyecto o que mas se necesita para avanzar

### Contexto técnico

El backend, frontend, Swagger y cálculos EVM ya estaban funcionando.

Quería utilizar la IA para realizar un análisis de brechas contra los requisitos de la prueba antes de considerar terminada la solución.

### Qué aportó la IA

Se identificaron como pendientes principales:

- completar `AI_PROCESS.md`;
- finalizar `README.md`;
- crear un script de inicialización de base de datos;
- revisar EAC y VAC en frontend;
- ejecutar build, lint, unit tests y E2E;
- completar el flujo `release/* → main`.

### Resultado

En vez de continuar agregando funcionalidades, cambié el enfoque hacia validación y cumplimiento de requisitos.

---

## Prompt 017

**Herramienta:** ChatGPT

**Etapa:** Documentación del proceso asistido por IA.

### Prompt original

> ok entonces entregamelo listo para yo copiar y pegar

### Contexto técnico

Habíamos definido la estructura que debía tener `AI_PROCESS.md` y necesitaba consolidarla para revisar el proceso completo.

### Decisión

Solicité el documento completo para disminuir errores producidos al ensamblar manualmente varias secciones.

Después continué revisándolo y corrigiendo datos que habían cambiado durante las validaciones finales.

---

Durante la etapa final hubo varias interacciones en las que no envié una pregunta textual nueva, sino que compartí directamente código, resultados de terminal o evidencias para continuar el diagnóstico.

No las registro artificialmente como prompts porque principalmente consistieron en información técnica enviada al asistente.

Entre estas evidencias estuvieron:

- ejecución de `npm run db:init`;
- resultado de `prisma contract emit`;
- resultado de `prisma db init`;
- contenido de `ActivitiesTable.tsx`;
- resultado de `npm run build` del frontend;
- resultado de `npm run lint`;
- resultados de `npm test`;
- resultados de `npm run test:cov`;
- resultados de `npm run test:e2e`;
- contenido de `ProjectsService`;
- contenido de `ActivitiesService`;
- errores de Jest;
- resultados finales de cobertura.

Estas evidencias hicieron parte del mismo flujo:

```text
ejecutar
→ compartir resultado real
→ analizar
→ corregir
→ volver a ejecutar


5. Cómo aprendí y validé EVM

Uno de los puntos importantes de la prueba era no limitarme a copiar fórmulas.

Antes de implementar el servicio revisé qué significaba cada dato.

BAC

Budget at Completion

Es el presupuesto total planificado para una actividad.

Planned Progress

Porcentaje que según el plan debería estar completado.

Actual Progress

Porcentaje realmente completado.

AC

Actual Cost

Costo real consumido.

A partir de estos datos implementé:

PV = planned progress × BAC
EV = actual progress × BAC

CV = EV - AC
SV = EV - PV

CPI = EV / AC
SPI = EV / PV

EAC = BAC / CPI
VAC = BAC - EAC

Entender las relaciones fue importante para después poder revisar si los números tenían sentido.

Por ejemplo:

CPI < 1

significa que el costo consumido es alto respecto al valor ganado.

Y:

SPI < 1

significa que el avance real está por debajo de lo que estaba planificado.

6. Validación matemática independiente

No quise validar el servicio comparando solamente una respuesta de IA con otra respuesta de IA.

Tomé un caso numérico y realicé los cálculos manualmente.

Datos:

BAC = 10000
Planned Progress = 50%
Actual Progress = 40%
AC = 4500
Planned Value
PV = 0.50 × 10000
PV = 5000
Earned Value
EV = 0.40 × 10000
EV = 4000
Cost Variance
CV = EV - AC
CV = 4000 - 4500
CV = -500
Schedule Variance
SV = EV - PV
SV = 4000 - 5000
SV = -1000
CPI
CPI = EV / AC
CPI = 4000 / 4500
CPI = 0.8888888889
SPI
SPI = EV / PV
SPI = 4000 / 5000
SPI = 0.8
EAC
EAC = BAC / CPI
EAC = 10000 / 0.8888888889
EAC = 11250
VAC
VAC = BAC - EAC
VAC = 10000 - 11250
VAC = -1250

Después ejecuté la implementación.

Los resultados obtenidos por EvMService coincidieron con los cálculos manuales.

Eso me permitió comprobar que la implementación no era correcta solamente a nivel de sintaxis, sino también matemáticamente.

7. Validación del consolidado de proyecto

También validé el cálculo utilizando varias actividades.

Los valores acumulados fueron:

BAC = 45000
PV = 23000
EV = 18500
AC = 20500

Resultados:

CV = -2000
SV = -4500

CPI = 0.902439...
SPI = 0.804348...

EAC = 49864.8649...
VAC = -4864.8649...

Una decisión importante fue no calcular:

promedio(CPI actividades)
promedio(SPI actividades)

Para consolidar el proyecto primero sumé:

BAC
PV
EV
AC

y sobre esos valores volví a calcular CPI y SPI.

Esta decisión evita que actividades pequeñas tengan el mismo peso matemático que actividades con presupuestos mucho mayores.

8. Casos límite

La prueba solicitaba revisar situaciones donde las fórmulas podían producir divisiones inválidas.

AC = 0

CPI requiere:

EV / AC

Si AC es cero, devolver Infinity no me pareció adecuado para la API.

La decisión fue:

CPI = null
EAC = null
VAC = null
PV = 0

SPI requiere:

EV / PV

Por lo tanto:

SPI = null
Actual Progress = 0

En este caso:

EV = 0

Si además existe costo real:

CPI = 0

y no genero una proyección EAC basada en una división por CPI igual a cero.

Proyecto sin actividades

Los valores acumulables quedan:

BAC = 0
PV = 0
EV = 0
AC = 0
CV = 0
SV = 0

Los índices que requieren división se devuelven:

CPI = null
SPI = null
EAC = null
VAC = null
9. Primera decisión donde no seguí una sugerencia de IA
Completar AI_PROCESS antes de tiempo

En una etapa inicial la IA propuso llenar anticipadamente buena parte de este documento.

Decidí no hacerlo.

Mi respuesta fue:

por eso no entiendo para que me das ese documento asi completo peguemos solo lo que llevamos no toda la cronologia del proyecto

La razón fue simple:

No quería documentar decisiones que todavía no había tomado.

Preferí que el documento reflejara el proceso real.

10. Segunda decisión donde no seguí una sugerencia de IA
Integración inicial de Prisma

Durante la configuración de Prisma algunas de las propuestas iniciales utilizaban una forma de acceso al cliente que no coincidía con la versión instalada en mi proyecto.

El código podía parecer correcto en teoría, pero TypeScript y el runtime mostraban que no correspondía al API que realmente tenía disponible.

En vez de forzar esa propuesta decidí utilizar como evidencia:

el error del compilador;
los archivos generados por Prisma;
el contrato;
la API real disponible;
prisma db verify;
npm run build.

La implementación final se adaptó al flujo de Prisma que estaba realmente instalado.

Esta situación me recordó que la IA puede proponer código correcto para otra versión de una librería y aun así ser incorrecto para el proyecto actual.

Por eso no mantuve una propuesta únicamente porque hubiera sido generada con confianza por la IA.

11. Decisión de arquitectura independiente

El reto indicaba preferencia por Java/Spring Boot o Python/FastAPI para backend, pero permitía utilizar otra tecnología justificando la decisión.

Decidí utilizar:

React
TypeScript
NestJS
Prisma
PostgreSQL

La razón principal fue dominio técnico.

Para una prueba con tiempo limitado preferí trabajar con un stack que pudiera:

desarrollar correctamente;
depurar;
probar;
explicar en el video;
mantener.

No quise utilizar un framework solamente porque apareciera como preferido si eso iba a reducir mi capacidad de explicar las decisiones tomadas.

12. Decisión sobre persistencia de EVM

La base de datos almacena solamente los datos fuente de la actividad:

BAC
plannedProgress
actualProgress
actualCost

No almaceno:

PV
EV
CV
SV
CPI
SPI
EAC
VAC

como columnas persistidas.

Estas métricas se calculan mediante EvMService.

La razón es evitar estados inconsistentes.

Por ejemplo:

actualProgress = 60

pero que por algún error el valor almacenado de EV todavía corresponda a un progreso anterior de 40%.

Al calcular EVM a partir de los datos fuente, los indicadores siempre corresponden al estado actual.

13. Separación de responsabilidades

Otra decisión fue evitar lógica matemática dentro de los controllers.

La estructura quedó aproximadamente así:

HTTP
 ↓
Controller
 ↓
Service
 ↓
EvMService
 ↓
Prisma
 ↓
PostgreSQL

EvMService concentra la lógica matemática.

Esto permitió probar EVM sin depender del servidor HTTP ni de PostgreSQL.

14. Estrategia de pruebas

No utilicé solamente pruebas manuales.

Dividí la validación en diferentes niveles.

Pruebas unitarias

La lógica EVM tiene casos para:

cálculo normal;
AC = 0;
PV = 0;
progreso real igual a cero;
consolidado;
proyecto sin actividades.

La cobertura final de la capa de servicios fue:

```text
ActivitiesService
Statements: 100%
Branches:   93.75%
Functions:  100%
Lines:      100%

ProjectsService
Statements: 100%
Branches:   90.90%
Functions:  100%
Lines:      100%

EvMService
Statements: 100%
Branches:   100%
Functions:  100%
Lines:      100%

Los tests unitarios finalizaron con:

Test Suites: 4 passed
Tests:       30 passed

Este porcentaje corresponde específicamente al servicio de cálculo EVM, no a todo el backend.

Pruebas E2E

Implementé al menos una prueba de integración para cada endpoint CRUD.

Projects:

POST   /projects
GET    /projects
GET    /projects/:id
PATCH  /projects/:id
DELETE /projects/:id

Activities:

POST   /activities
GET    /activities
GET    /activities/:id
PATCH  /activities/:id
DELETE /activities/:id

Resultado de la ejecución:

Test Suites: 1 passed
Tests:       10 passed

Las pruebas utilizan la aplicación NestJS y la base PostgreSQL local.

15. Validación del frontend

La validación final no terminó en Postman o en pruebas backend.

También probé el flujo desde React.

Probé:

cargar proyectos;
seleccionar proyecto;
visualizar consolidado;
crear actividad;
editar actividad;
eliminar actividad;
recalcular indicadores;
actualizar tabla;
actualizar gráfico.

El gráfico compara:

PV
EV
AC

por actividad.

Esto me permitió validar el sistema completo desde la entrada del usuario hasta la respuesta de la base de datos.

16. Swagger y contrato de API

Además del funcionamiento de los endpoints agregué Swagger/OpenAPI.

Disponible localmente en:

http://localhost:3000/api-docs

Documenté:

Projects;
Activities;
operaciones;
DTOs;
ejemplos;
parámetros;
códigos de respuesta.

También probé visualmente la documentación antes de cerrar la funcionalidad.

## 17. Uso de Gitflow

El trabajo fue separado utilizando ramas de funcionalidad.

Entre ellas:

```text
feature/project-setup
feature/project-crud
feature/activity-crud
feature/evm-calculations
feature/ai-process-documentation
feature/frontend-dashboard
feature/api-documentation
feature/final-documentation

Cada feature fue integrada hacia develop mediante Pull Request.

Para la entrega final creé:

release/1.0.0

Esta rama fue integrada mediante Pull Request hacia:

main

Finalmente marqué la versión entregable mediante el tag:

v1.0.0

El flujo final fue:

feature/* → develop → release/1.0.0 → main → v1.0.0

Estos resultados corresponden a la capa principal de servicios de negocio. EvMService alcanzó 100% de cobertura y los servicios de Projects y Activities superaron ampliamente el mínimo de 80% requerido.

18. Cómo utilicé IA durante debugging

Para mí uno de los mayores aportes de la IA durante esta prueba no fue generar archivos completos, sino ayudarme a reducir el tiempo para entender errores.

Mi flujo normal fue:

ejecutar
→ observar error
→ compartir error
→ analizar respuesta IA
→ revisar si tiene sentido
→ modificar
→ ejecutar nuevamente

Esto ocurrió especialmente con:

Prisma;
ESM;
TypeScript;
configuración de tests;
integración React / NestJS.

Una explicación de IA no significaba que el error estuviera resuelto.

El error solamente estaba resuelto cuando el mismo comando que había fallado funcionaba.

19. Qué considero que la IA hizo bien

La IA fue especialmente útil para:

interpretar rápidamente errores extensos;
recordar sintaxis;
proponer estructuras iniciales;
detectar posibles causas de un problema;
ayudar a generar casos de prueba;
organizar documentación;
revisar pasos de Gitflow.

También fue útil para trabajar de forma interactiva.

En vez de pedir todo el proyecto en un único prompt, fui avanzando sobre el estado real del repositorio.

20. Qué considero que la IA hizo mal o podía mejorar

El mayor problema apareció cuando las respuestas asumían versiones de herramientas diferentes a las instaladas.

Prisma fue el ejemplo más claro.

Una respuesta puede ser válida para:

versión A

pero no para:

versión B

También noté que cuando se entrega demasiada información de una sola vez aumenta el riesgo de cometer errores al aplicar cambios.

Por eso en varias etapas preferí detenerme, mostrar el resultado y continuar desde ahí.

21. Cómo comprobé que los números tenían sentido

Además de comparar resultados exactos utilicé interpretación.

En el ejemplo:

CPI = 0.888...

esperaba un valor inferior a 1 porque:

EV = 4000
AC = 4500

Se había gastado más dinero que el valor obtenido.

Igualmente:

SPI = 0.8

tenía sentido porque:

EV = 4000
PV = 5000

el avance real estaba por debajo del avance planeado.

Esta validación conceptual me permitió detectar errores que una comparación puramente sintáctica no mostraría.

22. Reflexión final sobre el uso de IA

Después de realizar la prueba considero que la IA funciona mejor como un compañero técnico que como un reemplazo del desarrollador.

Me permitió avanzar más rápido, especialmente cuando tenía que:

interpretar errores;
comparar alternativas;
generar estructuras repetitivas;
revisar código;
organizar pruebas.

Pero las decisiones importantes siguieron necesitando revisión humana.

En especial:

seleccionar arquitectura;
decidir cómo consolidar EVM;
definir casos límite;
determinar si una recomendación correspondía a la versión real de Prisma;
verificar matemáticamente los resultados;
decidir cuándo una funcionalidad estaba realmente terminada.

La idea que me queda del proceso es:

IA propone
desarrollador analiza
código demuestra
pruebas validan
23. Qué haría diferente

Si repitiera esta prueba cambiaría principalmente tres cosas.

1. Registrar prompts desde el primer minuto

Crearía desde el inicio un registro automático o manual de cada interacción importante con IA.

Esto facilitaría mucho la preparación de este documento.

2. Crear una matriz de requisitos

Trabajaría desde el primer momento con algo como:

requisito
→ implementación
→ prueba
→ evidencia

Eso permitiría comprobar rápidamente que ningún requisito quedó sin cubrir.
 
 3. Aumentar cobertura adicional

La capa principal de servicios quedó con una cobertura superior al 90% en branches y 100% en statements, functions y lines.

Con más tiempo agregaría pruebas unitarias adicionales sobre controllers, validación de DTOs y otros componentes de infraestructura para aumentar también la cobertura global del backend.

24. Conclusión

La parte más valiosa del uso de IA durante esta prueba no fue la cantidad de código que podía generar.

Fue poder utilizarla dentro de un proceso de ingeniería:

preguntar
→ analizar
→ implementar
→ ejecutar
→ medir
→ validar
→ corregir

Durante el proyecto hubo recomendaciones útiles y también recomendaciones que tuve que adaptar o descartar.

Por eso mi criterio final para aceptar una respuesta nunca fue que la IA dijera que estaba correcta.

El criterio fue:

¿compila?
¿ejecuta?
¿los números tienen sentido?
¿las pruebas pasan?
¿puedo explicar por qué funciona?

Si las cinco respuestas eran correctas, entonces consideraba terminada la funcionalidad.



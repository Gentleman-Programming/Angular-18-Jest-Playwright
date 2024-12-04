# Angular Testing Boilerplate

![Angular](https://img.shields.io/badge/angular-18+-red)
![Testing](https://img.shields.io/badge/testing-jest%20%7C%20playwright%20%7C%20testing--library-blue)
![Bun](https://img.shields.io/badge/bun-recommended-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

Boilerplate para configurar y realizar testing en Angular 18+ utilizando **Standalone Components**. Incluye un entorno completo para pruebas unitarias, funcionales y end-to-end, optimizado para usar con **Bun**.

---

## **Tabla de Contenidos**

1. [Características](#características)
2. [Tecnologías Usadas](#tecnologías-usadas)
3. [Requisitos](#requisitos)
4. [Instalación](#instalación)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Pruebas](#pruebas)
7. [Configuración Adicional](#configuración-adicional)
8. [Contribuir](#contribuir)
9. [Licencia](#licencia)

---

## **Características**

- **Angular 18+ Ready**: Soporte para Standalone Components, Signals y HttpClient.
- **Testing con Jest**: Configuración completa para pruebas unitarias y funcionales.
- **End-to-End con Playwright**: Flujo completo probado en navegadores reales.
- **Testing Library**: Facilita pruebas funcionales basadas en interacción de usuario.
- **Optimización con Bun**: Recomendado para instalar dependencias y ejecutar scripts rápidamente.
- Incluye configuración predefinida para `HttpTestingController`.

---

## **Tecnologías Usadas**

- **Angular 18+**: Framework base.
- **Jest**: Testing framework para pruebas rápidas y fáciles.
- **Playwright**: Framework para pruebas end-to-end.
- **Testing Library**: Pruebas funcionales intuitivas.
- **HttpClient Testing**: Para mockear y controlar solicitudes HTTP.
- **Bun**: Alternativa moderna a Node.js para mayor velocidad.

---

## **Requisitos**

- Node.js >= 18 o Bun >= 1.0
- Angular CLI >= 18.0.0
- Playwright CLI

---

## **Instalación**

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/angular-testing-boilerplate.git
   cd angular-testing-boilerplate
   ```

2. **Instalar dependencias con Bun (recomendado):**

   ```bash
   bun install
   ```

   O con npm:

   ```bash
   npm install
   ```

3. **Configurar Playwright (si aún no lo hiciste):**

   ```bash
   npx playwright install
   ```

4. **Levantar el servidor de desarrollo:**

   ```bash
   bun run ng serve
   ```

   O con npm:

   ```bash
   npm run start
   ```

## **Estructura del Proyecto**

```bash
src/
├── app/
│   ├── Login/
│   │   ├── login.component.ts # Componente de Login
│   │   ├── login.component.spec.ts # Pruebas unitarias y funcionales
│   ├── services/
│   ├── auth.service.ts # Servicio de autenticación
│   ├── auth.service.spec.ts # Pruebas unitarias del servicio
├── e2e/
│   ├── login.e2e.spec.ts # Pruebas end-to-end con Playwright
├── functional/
│   ├── login.functional.spec.ts # Pruebas funcionales con Playwright
├── jest.config.js # Configuración de Jest
├── playwright.config.ts # Configuración de Playwright
├── setup-jest.ts # Configuración inicial de Jest
```

## **Pruebas**

### **Unitarias**

Pruebas de lógica interna de componentes y servicios utilizando Jest y HttpTestingController.

```bash
bun run test
```

O con npm:

```bash
npm run test
```

### **Funcionales**

Pruebas de interacción en el DOM con Testing Library.

```bash
bun run test
```

O con npm:

```bash
npm run test
```

### **End-to-End**

Pruebas del flujo completo de la aplicación con Playwright.

```bash
ng e2e
```

## **Integración con Playwright**

El proyecto incluye pruebas preconfiguradas en e2e/. Podés agregar más tests siguiendo el patrón en login.e2e.spec.ts.

## **Uso de Bun**

Para ejecutar scripts más rápido, se recomienda usar bun. Asegurate de tener Bun instalado y configurado como gestor de paquetes.

## **Contribuir**

1. Realizá un fork del repositorio.
2. Crea una rama para tu feature o bugfix:

   ```bash
   git checkout -b mi-feature
   ```

3. Enviá un pull request con tus cambios.

## **Licencia**

Este proyecto está bajo la Licencia MIT. Podés usarlo y modificarlo libremente.

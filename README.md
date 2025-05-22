# angular-testing

Buenas, acá estamos con un proyecto Angular 18, preparado para testear como corresponde (Jest para unitarios, Playwright para E2E) y con un setup moderno.

## ¿Qué es esto?
Una app base en Angular 18, con routing y un componente de login de ejemplo. Ideal para arrancar proyectos serios, probar features o experimentar con testing avanzado.

## Requisitos
- Node.js >= 18
- npm >= 9

## Instalación
```bash
npm install
```

## Scripts útiles
- `npm start`: Levanta la app en modo desarrollo.
- `npm run build`: Compila la app para producción.
- `npm test`: Corre los tests unitarios con Jest.
- `npm run test:coverage`: Cobertura de tests unitarios.
- `npm run e2e`: Corre tests end-to-end con Playwright.

## Testing
- **Unitarios:** Usamos Jest + Testing Library para tests rápidos y confiables.
- **E2E:** Playwright, porque Cypress ya fue (mentira, pero Playwright es más rápido y flexible).

## Notas
- El componente principal es `AppComponent`, con routing y un `LoginComponent` de ejemplo.
- Si querés escalar la app, pensá en modularizar y separar lógica de UI (contenedor-presentacional, viste).

---

Hecho con amor y obsesión por la arquitectura limpia. Si te sirvió, tirá una estrella o invitame un café virtual.

import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';
import { MarvelCharactersComponent } from './marvel-characters/marvel-characters.component'; // <-- IMPORTAR

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'marvel-characters', component: MarvelCharactersComponent }, // <-- NUEVA RUTA
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Considera una ruta para dashboard o una página principal después del login
  // { path: 'dashboard', component: DashboardComponent }, // Ejemplo
  // Y una ruta wildcard para 'Not Found' al final
  // { path: '**', component: PageNotFoundComponent } // Ejemplo
];

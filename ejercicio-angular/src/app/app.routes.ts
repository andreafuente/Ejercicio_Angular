import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Home } from './pages/home/home';
import { AcercaDe } from './pages/acerca-de/acerca-de';
import { Dashboard } from './pages/dashboard/dashboard';
import { Crud } from './pages/crud/crud';
import { Galeria } from './pages/galeria/galeria';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'acerca-de', component: AcercaDe },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
  { path: 'crud', component: Crud, canActivate: [authGuard] },
  { path: 'galeria', component: Galeria, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'perfil', component: Profile, canActivate: [authGuard] }
];

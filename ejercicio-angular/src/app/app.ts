import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraPublica } from './layout/cabecera-publica/cabecera-publica';
import { MenuPublico } from './layout/menu-publico/menu-publico';
import { MenuPrivado } from './layout/menu-privado/menu-privado';
import { Footer } from './layout/footer/footer';
import { CabeceraPrivada } from './layout/cabecera-privada/cabecera-privada';
import { Authentication } from './services/authentication';


@Component({
  imports: [RouterOutlet, CabeceraPublica, CabeceraPrivada, MenuPublico, MenuPrivado, Footer ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ejercicio-angular');
  authentication = inject(Authentication);
}

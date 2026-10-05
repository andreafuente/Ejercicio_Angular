import { Component, inject } from '@angular/core';
import { Authentication } from '../../services/authentication';

@Component({
  selector: 'app-cabecera-privada',
  imports: [],
  templateUrl: './cabecera-privada.html',
  styleUrl: './cabecera-privada.css',
})
export class CabeceraPrivada {
  authentication = inject(Authentication);

  logout(): void {
    this.authentication.logout();
  }
}
import { Component, Input } from '@angular/core';
import { Login } from './models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public pantallaLogin = true;
  public headerLogin = 'none';
  constructor() {}
  recibirLogueo(data: Login): void {
    if (
      (data.user === 'admin' && data.password === 'admin') ||
      (data.user === 'user' && data.password === 'user')
    ) {
      this.headerLogin = data.user;
      this.pantallaLogin = false;
    }
  }
  logout(res) {
    if (res === 'salir') {
      this.pantallaLogin = true;
      this.headerLogin = 'none';
    }
  }
}

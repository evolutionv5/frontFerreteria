import { Component, Input } from '@angular/core';
import { Login } from './models/login.interface';

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
    this.headerLogin = data.user;
    console.log('APP COMPONENT', this.headerLogin);
    console.log(data);
    if (
      (data.user === 'admin' && data.password === 'admin') ||
      (data.user === 'user' && data.password === 'user')
    ) {
      this.pantallaLogin = false;
      console.log('holaa???');
    }
    console.log('APP COMPONENT', this.pantallaLogin);
  }
  logout(res) {
    if (res === 'salir') {
      this.pantallaLogin = true;
      this.headerLogin = 'none';
    }
  }
}

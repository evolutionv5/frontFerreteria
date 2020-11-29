import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public login = true;
  public headerLogin = 'none';
  public account = {
    usr: '',
    paswd: '',
  };
  constructor() {}
  recibirLogueo(data): void {
    this.headerLogin = data.user;
    this.login = !data;
  }
}

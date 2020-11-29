import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  @Output() respuesta = new EventEmitter<boolean>();
  public login = {
    user: '',
    pass: '',
  };
  ngOnInit(): void {}
  enviar(data): void {
    this.login = data;
    this.verificarLogueo();
  }
  verificarLogueo(): void {
    console.log(this.login);
    if (this.login.user === 'admin' && this.login.pass === 'admin') {
      this.respuesta.emit(true);
    } else if (this.login.user === 'user' && this.login.pass === 'user') {
      this.respuesta.emit(true);
    } else {
      this.respuesta.emit(false);
    }
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Login } from '../../models/login.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  @Output() respuesta = new EventEmitter<Login>();

  ngOnInit(): void {}
  enviar(data: Login): void {
    // this.verificarLogueo();
    this.respuesta.emit(data);
  }
  verificarLogueo(): void {
    // if (this.login.user === 'admin' && this.login.pass === 'admin') {
    //   this.respuesta.emit(true);
    // } else if (this.login.user === 'user' && this.login.pass === 'user') {
    //   this.respuesta.emit(true);
    // } else {
    //   this.respuesta.emit(false);
    // }
  }
}

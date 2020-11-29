import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {
  faUser,
  faHome,
  faStore,
  faTools,
  faPeopleCarry,
  faShoppingCart,
  faUserFriends,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() logueo: string;
  // Iconos
  public inicioIcon = faHome;
  public clientesIcon = faUser;
  public ventasIcon = faStore;
  public materialesIcon = faTools;
  public proveedoresIcon = faPeopleCarry;
  public pedidosIcon = faShoppingCart;
  public empleadosIcon = faUserFriends;
  public ingresarIcon = faDoorOpen;

  // Logueo
  constructor() {}
  ngOnChanges() {
    console.log(this.logueo);
  }
  ngOnInit(): void {}
}

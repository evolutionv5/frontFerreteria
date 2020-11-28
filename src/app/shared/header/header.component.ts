import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  public inicioIcon = faHome;
  public clientesIcon = faUser;
  public ventasIcon = faStore;
  public materialesIcon = faTools;
  public proveedoresIcon = faPeopleCarry;
  public pedidosIcon = faShoppingCart;
  public empleadosIcon = faUserFriends;
  public ingresarIcon = faDoorOpen;

  constructor() {}

  ngOnInit(): void {}
}

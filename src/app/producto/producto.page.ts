import { Component, OnInit } from '@angular/core';
import { ProductosService }from './../servicio/productos.service';
import { ViewDidEnter} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../servicio/auth.service';
import { UsuarioLogin } from '../modelos/usuarioLogin';





@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements ViewDidEnter {
  public usuarioActivo: UsuarioLogin | null=null;

  constructor(
    public proS: ProductosService,
    private auth: AuthService,
    private router:Router
  ) { }



  ionViewDidEnter(): void {
    this.proS.consultarProductos();

  }

  salir() {
    this.proS.resetearProductos()
    this.router.navigate(['/']);
  }
  ngOnInit() {
  }

}


import { Component } from '@angular/core';
import { UsuarioLogin } from '../modelos/usuarioLogin';
import { ViewWillEnter,  ViewDidLeave } from '@ionic/angular';
import { AuthService } from '../servicio/auth.service';
import { Subscription } from 'rxjs';
import { ProductosService } from '../servicio/productos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],

})
export class PerfilPage implements ViewWillEnter, ViewDidLeave {
  public usuarioActivo: UsuarioLogin | null=null;
  private suscripcion: Subscription | null=null

  constructor(
      private auth: AuthService,
      public proS: ProductosService,
      private router:Router
  ) { }
  ionViewWillEnter(): void {
    this.suscripcion = this.auth.$usuarioActivo.subscribe( usuario => {
      this.usuarioActivo = usuario;
    });
  }
  ionViewDidLeave(): void {
    this.suscripcion?.unsubscribe()
  }
  salir() {
    this.proS.resetearProductos()
    this.router.navigate(['/']);
  }
}

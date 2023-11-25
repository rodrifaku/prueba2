import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto, RespuestaProducto } from '../modelos/productos';
import { LoadingController } from '@ionic/angular';
import { delay } from 'rxjs';
import { AuthService } from './../servicio/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private readonly URL_PRODUCTO = "https://dummyjson.com/auth/products?skip="
  public productos: Producto[] = []
  public skip = 0;
  public limite = 0;
  public total=0;
  constructor(
    private http: HttpClient,
    private loading: LoadingController,
    public auth: AuthService
  ) { }
  public async consultarProductos(){
    const control = await this.loading.create({

      message: "Cargando..."
    });
    control.present();
    this.http.get<RespuestaProducto>(`${this.URL_PRODUCTO}${this.skip}`,{headers: {
      'Authorization': 'Bearer ' + this.auth.token, //localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  })
    .pipe(delay(2000))
    .subscribe(respuestaProducto =>{
      control.dismiss();
      this.skip = this.skip + respuestaProducto.limit;
      this.limite = respuestaProducto.limit;
      this.total = respuestaProducto.total;
      this.productos = respuestaProducto.products;

    });
  }
  public async paginaAnterior() {

    if (this.skip >= this.limite) {
      this.skip = this.skip - this.limite * 2;
      this.consultarProductos();
    }
  }

  public resetearProductos() {
    this.skip = 0;
    this.limite = 0;
    this.productos = [];
  }
}


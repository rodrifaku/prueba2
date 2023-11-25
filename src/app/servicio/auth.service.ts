import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay} from 'rxjs';
import { UsuarioLogin } from '../modelos/usuarioLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {//Observador cargando
  public token: string = "";
  private cargando: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public $cargando = this.cargando.asObservable();//observador publico
  private usuarioActivo: BehaviorSubject< UsuarioLogin  | null>=new BehaviorSubject<UsuarioLogin  | null>(null);//Observador usuario
  private mensajeError: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public $mensajeError = this.mensajeError.asObservable();
  public $usuarioActivo = this.usuarioActivo.asObservable();//observador publico
  private readonly URL_LOGIN ="https://dummyjson.com/auth/login";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  public intentarLogear(usuario: string, password: string){
    this.cargando.next(true);
    this.http.post<UsuarioLogin >(this.URL_LOGIN, JSON.stringify({
      username: usuario,
      password: password
    }),
    {
      headers:{
        "Content-Type":"application/json"
      }
    }
    )
    .pipe(delay(2000))
    .subscribe(resultado => {
      this.usuarioActivo.next(resultado);
      this.cargando.next(false);
      this.router.navigate(['/producto'])
      this.token = resultado.token;
    },
    error => {
      this.mensajeError.next('Usuario o contraseña incorrectos');
      this.cargando.next(false);
    }
    );
  }

}

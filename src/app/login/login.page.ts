import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Servicio, Clase del tipo
import { AuthService } from './../servicio/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public formularioLogin: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,

  ) {
    this.formularioLogin = this.formBuilder.group({
      usuario: ['', [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(10)
                    ]
                ],
      password:['', [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(10)
                    ]

      ]
    });
  }
  public intenrarLogear(){
    if(!this.formularioLogin.valid){
      alert("Ingresó datos Incorrectos");
      this.formularioLogin.controls['usuario'].setValue("");
      this.formularioLogin.controls['password'].setValue("");
      this.formularioLogin.clearValidators();
      return
    }
    this.auth.intentarLogear(
      this.formularioLogin.controls["usuario"].value,
      this.formularioLogin.controls["password"].value
    );
  }
  ngOnInit() {
  }

}

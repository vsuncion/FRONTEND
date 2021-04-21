import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/dto/request/Usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { AutenticacionResponse } from 'src/app/dto/response/Autenticacion.response';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();
  formularioGrp: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              @Inject(AutenticacionService) private autenticacionService: AutenticacionService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasenia: ['', [Validators.required]],
    });
  }

  autenticar() {
    this.spinnerService.show();
    this.usuario.username = this.formularioGrp.get('usuario').value;
    this.usuario.password = this.formularioGrp.get('contrasenia').value;

    // localStorage.setItem('user', JSON.stringify(this.usuario));

    this.autenticacionService.getAccessToken(this.usuario).subscribe(
      (data: AutenticacionResponse) => {
        // console.log(data);
        this.spinnerService.hide();
        this.autenticacionService.saveToken(data);

        this.router.navigate(['/panel/home']);
      }, error => {
        console.log(error);
        this.spinnerService.hide();
        Swal.fire({
          icon: 'error',
          title: 'Usuario o Clave Inocrrectos',
          text:  error.error.error
        });
      }
    );




  }
}

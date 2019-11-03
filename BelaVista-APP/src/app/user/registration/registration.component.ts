import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  constructor(
    public fb: FormBuilder
  , public router: Router
  , private toastr: ToastrService
  , private authService: AuthService) { }

  ngOnInit() {
    this.isValid();
  }

  isValid() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      //cria grupo para validar as duas senhas
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparatorPassword })
    });
  }

  saveUser() {
    if (this.registerForm.valid) {
      this.user = Object.assign({
        password: this.registerForm.get('passwords.password').value}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login/']);
          this.toastr.success('Cadastro realizado');
        }, error => {
          const erro = error.error;
          erro.forEach(element => {
            console.log(error);
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Usuário já existe');
                break;
              default:
                  this.toastr.error(`Erro ao cadastrar usuário: CODE: ${element.code}`); break;
            }
            this.registerForm.reset();
          });
        })
    }
  }

  comparatorPassword(fb: FormGroup) {
    const confirmPassword = fb.get('confirmPassword');
    if (confirmPassword.errors == null || 'mismatch' in confirmPassword.errors)
    {
      if (fb.get('password').value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      } else
      {
        confirmPassword.setErrors(null);
      }
    }
  }
}

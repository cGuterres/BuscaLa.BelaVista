import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/AuthService.service';
import { Router } from '@angular/router';
import { Condominium } from 'src/app/_models/Condominium';
import { CondominiumService } from 'src/app/_services/Condominium.service';
import { PreRegistrationService } from 'src/app/_services/PreRegistration.service';
import { PreRegistration } from 'src/app/_models/PreRegistration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  condominium: Condominium;
  form: any;

  constructor(
    public fb: FormBuilder
  , public router: Router
  , private toastr: ToastrService
  , private authService: AuthService
  , private condominiumService: CondominiumService
  , private preRegistrationService: PreRegistrationService) { }

  ngOnInit() {
    this.isValid();
  }

  isValid() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      userName: ['', Validators.required],
      cpf: ['', Validators.required],
      ap: ['', Validators.required],
      rg: [''],
      contactPhone: [''],
      // cria grupo para validar as duas senhas
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparatorPassword })
    });
  }

  saveUser() {
    if (this.registerForm.valid) {
      this.form = Object.assign({
        password: this.registerForm.get('passwords.password').value}, this.registerForm.value);
      // verifica se o usuário que está sendo cadastrado está na base de pre cadastro
      console.log(this.form.cpf);
      console.log(this.form.ap);
      this.preRegistrationService.GetPreRegistration(this.form.cpf, this.form.ap).subscribe(
        (obj: PreRegistration) => {
          // se existir cadastra
          if (obj != null) {
            this.user = Object.assign({
              password: this.registerForm.get('passwords.password').value}, this.registerForm.value);
            this.authService.register(this.user).subscribe(
              () => {
                this.condominium = Object.assign({}, this.registerForm.value);
                this.condominiumService.saveCondominiun(this.condominium).subscribe(
                  () => {
                  }, error => {
                });
                this.router.navigate(['/user/login/']);
                this.toastr.success('Cadastro realizado');
              }, error => {
                const erro = error.error;
                erro.forEach(element => {
                  switch (element.code) {
                    case 'DuplicateUserName':
                      this.toastr.error('Usuário já existe');
                      break;
                    default:
                        this.toastr.error(`Erro ao cadastrar usuário: CODE: ${element.code}`); break;
                  }
                  this.registerForm.reset();
                });
              });
          } else {
            this.toastr.error('Usuário não possui pré cadastro. Entre em contato com o sindico.');
          }
        }, error => {
          this.toastr.error('Erro ao carregar pre cadastros.');
        });
    }
  }

  comparatorPassword(fb: FormGroup) {
    const confirmPassword = fb.get('confirmPassword');
    if (confirmPassword.errors == null || 'mismatch' in confirmPassword.errors) {
      if (fb.get('password').value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }
}

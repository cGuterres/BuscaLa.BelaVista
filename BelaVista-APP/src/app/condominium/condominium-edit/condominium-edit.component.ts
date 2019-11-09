import { Component, OnInit } from '@angular/core';
import { CondominiumService } from 'src/app/_services/Condominium.service';
import { WarningService } from 'src/app/_services/Warning.service';
import { VisitantService } from 'src/app/_services/Visitant.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap';
import { Condominium } from 'src/app/_models/Condominium';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { Warning } from 'src/app/_models/Warning';
import { ActivatedRoute } from '@angular/router';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-condominium-edit',
  templateUrl: './condominium-edit.component.html',
  styleUrls: ['./condominium-edit.component.css']
})
export class CondominiumEditComponent implements OnInit {

  registerForm: FormGroup;
  condominium: Condominium = null;

  constructor(
    private condominiumService: CondominiumService
  , private warningService: WarningService
  , private visitantService: VisitantService
  , private modalService: BsModalService
  , private fb: FormBuilder
  , private toastr: ToastrService
  , private localeService: BsLocaleService
  , private router: ActivatedRoute
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.isValid();
    this.loadingDetail();
  }

  loadingDetail() {
    const id = +this.router.snapshot.paramMap.get('id');
    this.condominiumService.GetCondominiumById(id)
      .subscribe(
        (condominium: Condominium) => {
          this.condominium = Object.assign({}, condominium);
          this.registerForm.patchValue(this.condominium);

          this.condominium.warnings.forEach(warning => {
            //this.warnings.push(this.createWarning(warning));
          });
          // this.evento.redesSociais.forEach(redeSocial => {
          //   this.redesSociais.push(this.criaRedeSocial(redeSocial));
          // });
        }
      );
  }

  isValid() {
    this.registerForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      rg: ['', ''],
      contactPhone: ['', ''],
      ap: ['', Validators.required],
      warnings: this.fb.array([])
    });
  }

  get warnings(): FormArray {
    return this.registerForm.get('warnings').value as FormArray;
  }

  get visitants(): FormArray {
    return this.registerForm.get('visitants').value as FormArray;
  }

  addWarning() {
    console.log('clicado');
    this.warnings.push(this.createWarning({id: 0}));
  }

  createWarning(warning: any) {
    return this.fb.group({
      condominiumId: [warning.condominiumId],
      scheduleDate: [warning.scheduleDate, Validators.required],
      description: [warning.description, Validators.required]
    });
  }

  removeWarning(id: number) {
    this.warnings.removeAt(id);
  }

  validateVisitant(visitant: any) {
    return this.fb.group({
      condominiumId: [visitant.id],
      name: [visitant.name, Validators.required],
      cpf: [visitant.cpf, Validators.required],
      phone: [visitant.phone, Validators.required]
    });
  }
}

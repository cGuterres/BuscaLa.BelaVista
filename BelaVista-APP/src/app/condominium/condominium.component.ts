import { Component, OnInit, TemplateRef } from '@angular/core';
import { stringify } from 'querystring';
import { CondominiumService } from '../_services/Condominium.service';
import { Condominium } from '../_models/Condominium';
import { BsModalRef, BsModalService, ptBrLocale } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../util/Constants';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/AuthService.service';
import { User } from '../_models/User';
//defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-condominium',
  templateUrl: './condominium.component.html',
  styleUrls: ['./condominium.component.css']
})
export class CondominiumComponent implements OnInit {
  condominiuns: Condominium[];
  gridFiltered: Condominium[];
  registerForm: FormGroup;
  newCondominium: Condominium;
  mode = '';
  bodyDeletarCondominium: string;
  constructor(
    private condominiumService: CondominiumService
  , private modalService: BsModalService
  , private fb: FormBuilder
  , private toastr: ToastrService
  , private authService: AuthService
    ) { }

  isAdmin(email: string) {
    if (this.authService.isAdmin()) {
      return true;
    }

    if (email === this.authService.currentUserValue.email) {
      return true;
    }
    return false;
  }
  _filterGrid: string;
  get filterGrid(): string {
    return this._filterGrid;
  }

  set filterGrid(value: string) {
    this._filterGrid = value;
    this.gridFiltered = this._filterGrid.length > 0 ? this.searchCondominiumByFilter(this._filterGrid) : this.condominiuns;
  }

  editCondominium(condominium: Condominium, template: any) {
    this.mode = Constants.MODE_PUT;
    this.openModal(template);
    this.newCondominium = condominium;
    //popula o modal com os dados do condomino
    this.registerForm.patchValue(condominium);
  }

  saveCondominum(template: any){
    this.mode = Constants.MODE_POST;
    this.openModal(template);
  }

  openModal(template: any) {
    //zera o modal sempre que abre
    this.registerForm.reset();
    template.show();
  }

  isValid() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      rg: ['', ''],
      contactPhone: ['', ''],
      ap: ['', Validators.required]
    });
  }

  save(template: any){
    if (this.isValid) {
      if (this.mode === Constants.MODE_POST) {
        this.newCondominium = Object.assign({}, this.registerForm.value);
        this.condominiumService.saveCondominiun(this.newCondominium).subscribe(
        (obj: Condominium) => {
          //fecha o modal de cadastro
          template.hide();
          //atualiza a grid
          this.getAllCondominiuns();
          this.toastr.success('Inserido com sucesso!');
        }, error => {
          this.toastr.error(`Erro ao inserir cadastro: ${error}`);
        });
      } else {
        this.newCondominium = Object.assign({id: this.newCondominium.id}, this.registerForm.value);
        this.condominiumService.editCondominiun(this.newCondominium).subscribe(
        (obj: Condominium) => {
          //fecha o modal de cadastro
          template.hide();
          //atualiza a grid
          this.getAllCondominiuns();
          this.toastr.success('Atualizado com sucesso!');
        }, error => {
            this.toastr.error(`Erro ao atualizar cadastro: ${error}`);
        });
      }
    }
  }

  excluirCondominium(condominium: Condominium, template: any) {
    this.openModal(template);
    this.newCondominium = condominium;
    this.bodyDeletarCondominium = `Tem certeza que deseja excluir o condômino: ${condominium.name}, Código: ${condominium.id}`;
  }

  confirmeDelete(template: any) {
    this.condominiumService.deleteCondominiun(this.newCondominium.id).subscribe(
      () => {
          template.hide();
          this.getAllCondominiuns();
          this.toastr.success('Deletado com sucesso');
        }, error => {
          this.toastr.error(`Erro ao deletar: ${error}`);
        }
    );
  }

  ngOnInit() {
    this.isValid();
    //carrega a lista de condôminos
    this.getAllCondominiuns();
  }

  getAllCondominiuns() {
    this.condominiumService.getAllCondominiunsAsync().subscribe(
    // tslint:disable-next-line: variable-name
    (_return: Condominium[]) => {
      console.log(_return);
        this.condominiuns = _return;
        this.gridFiltered = this.condominiuns;
    }
  , error => {
    this.toastr.error(`Erro ao tentar carregar condôminos: ${error}`);
  });
}

searchCondominiumByFilter(filtered: string): Condominium [] {
  if(filtered.length > 0) {
    filtered = filtered.toLowerCase();
    return this.condominiuns.filter(
      condominiun => condominiun.name.toLowerCase().indexOf(filtered) !== -1
      );
    }
  }
}

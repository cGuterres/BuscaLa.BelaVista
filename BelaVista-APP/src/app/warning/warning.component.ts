import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WarningService } from '../_services/Warning.service';
import { Warning } from '../_models/Warning';
import { Constants } from '../util/Constants';
import { CondominiumService } from '../_services/Condominium.service';
import { Condominium } from '../_models/Condominium';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { AuthService } from '../_services/AuthService.service';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {
  listWarnings: Warning[];
  gridFiltered: Warning[];
  registerForm: FormGroup;
  //novo aviso
  newWarning: Warning;
  bodyDeleteMessage: string;
  mode: string;

  listCondominiuns: Condominium[] = [];

  constructor(
    private waringService: WarningService
  , private condominiumService: CondominiumService
  , private modalService: BsModalService
  , private fb: FormBuilder
  , private toastr: ToastrService
  , private localeService: BsLocaleService
  , private authService: AuthService
  ) {
    this.localeService.use('pt-br');
    this.isAdmin();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  // tslint:disable-next-line: variable-name
  _filterGrid: string;
  get filterGrid(): string {
    return this._filterGrid;
  }

  set filterGrid(value: string) {
    this._filterGrid = value;
    this.gridFiltered = this._filterGrid.length > 0 ? this.searchWarningByFilter(this._filterGrid) : this.listWarnings;
  }

  searchWarningByFilter(filtered: string) {
    if (filtered.length > 0) {
      filtered = filtered.toLowerCase();
      return this.listWarnings.filter(
        warning => warning.condominium.name.toLowerCase().indexOf(filtered) !== -1
        );
    }
  }

  ngOnInit() {
    this.isValid();

    this.getAllWarnings();
  }

  getAllWarnings() {
    this.waringService.getAllWarningsAsync().subscribe(
      // tslint:disable-next-line: variable-name
      (_return: Warning[]) => {
          this.listWarnings = _return;
          this.gridFiltered = this.listWarnings;
      }
    , error => {
      this.toastr.error(`Erro ao tentar carregar avisos: ${error}`);
    });
  }

  saveWarning(template: any) {
    this.mode = Constants.MODE_POST;
    this.getAllCondominiums();
    this.openModal(template);
  }

  editWarning(warning: Warning, template: any) {
    this.listCondominiuns = [];
    this.mode = Constants.MODE_PUT;
    this.openModal(template);
    this.newWarning = warning;
    // consulta o condomino pelo id
    this.condominiumService.GetCondominiumById(warning.condominiumId).subscribe(
      (obj: Condominium) => {
        this.listCondominiuns.push(obj);
      }, error => {
        this.toastr.error(`Erro ao consultar condomino: ${error}`);
      });
    // popula o modal com os dados de aviso
    this.registerForm.patchValue({
      name: warning.condominium.name,
      scheduleDate: warning.scheduleDate,
      description: warning.description,
      condominiumId: warning.condominium.id
    });
  }

  excluirWarning(warning: Warning, template: any) {
    this.openModal(template);
    this.newWarning = warning;
    this.bodyDeleteMessage = `Tem certeza que deseja excluir o aviso: ${warning.description}, Código: ${warning.id}`;
  }

  saveEditWarning(template: any) {
    if (this.isValid) {
      if (this.mode === Constants.MODE_POST) {
        this.newWarning = Object.assign({}, this.registerForm.value);
        this.waringService.saveWarning(this.newWarning).subscribe(
        (obj: Warning) => {
          // fecha o modal de cadastro
          template.hide();
          // atualiza a grid
          this.getAllWarnings();
          this.toastr.success('Inserido com sucesso!');
        }, error => {
          this.toastr.error(`Erro ao inserir cadastro: ${error}`);
        });
      } else {
        this.newWarning = Object.assign({id: this.newWarning.id}, this.registerForm.value);
        this.waringService.editWarning(this.newWarning).subscribe(
        (obj: Warning) => {
          // fecha o modal de cadastro
          template.hide();
          // atualiza a grid
          this.getAllWarnings();
          this.toastr.success('Atualizado com sucesso!');
        }, error => {
            this.toastr.error(`Erro ao atualizar cadastro: ${error}`);
        });
      }
    }
  }

  confirmeDelete(template: any) {
    this.waringService.deleteWarning(this.newWarning.id).subscribe(
      () => {
          template.hide();
          this.getAllWarnings();
          this.toastr.success('Deletado com sucesso');
        }, error => {
          this.toastr.error(`Erro ao deletar: ${error}`);
        }
    );
  }

  isValid() {
    this.registerForm = this.fb.group({
      scheduleDate: ['', Validators.required],
      description: ['', Validators.required],
      condominiumId: ['']
    });
  }
  openModal(template: any) {
    //zera o modal sempre que abre
    this.registerForm.reset();
    this.registerForm.patchValue({
      condominiumId: 1
    });
    template.show();
  }

  getAllCondominiums() {
    this.listCondominiuns = [];
    this.condominiumService.getAllCondominiunsAsync().subscribe(
      // tslint:disable-next-line: variable-name
      (_return: Condominium[]) => {
          this.listCondominiuns = _return;
      }
    , error => {
      this.toastr.error(`Erro ao tentar carregar condôminos: ${error}`);
    });
  }
}

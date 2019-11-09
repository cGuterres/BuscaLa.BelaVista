import { Component, OnInit } from '@angular/core';
import { CondominiumService } from '../_services/Condominium.service';
import { BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Visitant } from '../_models/Visitant';
import { Condominium } from '../_models/Condominium';
import { Constants } from '../util/Constants';
import { VisitantService } from '../_services/Visitant.service';

@Component({
  selector: 'app-visitant',
  templateUrl: './visitant.component.html',
  styleUrls: ['./visitant.component.css']
})
export class VisitantComponent implements OnInit {

  listVisitants: Visitant[];
  gridFiltered: Visitant[];
  registerForm: FormGroup;
  //novo aviso
  newVisitant: Visitant;
  bodyDeleteMessage: string;
  mode: string;

  listCondominiuns: Condominium[] = [];

  constructor(
      private condominiumService: CondominiumService
    , private modalService: BsModalService
    , private fb: FormBuilder
    , private toastr: ToastrService
    , private visitantService: VisitantService) { }

  ngOnInit() {
    this.isValid();

    this.getAllVisitants();
  }

  getAllVisitants() {
    this.visitantService.getAllVisitantsAsync().subscribe(
      // tslint:disable-next-line: variable-name
      (_return: Visitant[]) => {
          this.listVisitants = _return;
          this.gridFiltered = this.listVisitants;
      }
    , error => {
      console.log(error);
      this.toastr.error(`Erro ao tentar carregar avisos: ${error}`);
    });
  }

   // tslint:disable-next-line: variable-name
   _filterGrid: string;
   get filterGrid(): string {
     return this._filterGrid;
   }

   set filterGrid(value: string) {
     this._filterGrid = value;
     this.gridFiltered = this._filterGrid.length > 0 ? this.searchVisitantByFilter(this._filterGrid) : this.listVisitants;
   }

   searchVisitantByFilter(filtered: string) {
     if (filtered.length > 0) {
       filtered = filtered.toLowerCase();
       return this.listVisitants.filter(
         vistant => vistant.name.toLowerCase().indexOf(filtered) !== -1
         );
     }
   }

   saveVisitant(template: any) {
    this.mode = Constants.MODE_POST;
    this.getAllCondominiums();
    this.openModal(template);
  }

  editVisitant(vistant: Visitant, template: any) {
    this.listCondominiuns = [];
    this.mode = Constants.MODE_PUT;
    this.openModal(template);
    this.newVisitant = vistant;
    //consulta o condomino pelo id
    this.condominiumService.GetCondominiumById(vistant.condominiumId).subscribe(
      (obj: Condominium) => {
        this.listCondominiuns.push(obj);
      }, error => {
        this.toastr.error(`Erro ao consultar condomino: ${error}`);
      });
    //popula o modal com os dados do visitante
    this.registerForm.patchValue({
      condomimniumName: vistant.condominium.name,
      name: vistant.name,
      cpf: vistant.cpf,
      condominiumId: vistant.condominium.id,
      phone: vistant.phone
    });
  }

  deleteVisitant(vistant: Visitant, template: any) {
    this.openModal(template);
    this.newVisitant = vistant;
    this.bodyDeleteMessage = `Tem certeza que deseja excluir o visitante: ${vistant.name}, Código: ${vistant.id}`;
  }

  saveEditVisitant(template: any) {
    if (this.isValid) {
      if (this.mode === Constants.MODE_POST) {
        this.newVisitant = Object.assign({}, this.registerForm.value);
        this.visitantService.saveVisitant(this.newVisitant).subscribe(
        (obj: Visitant) => {
          //fecha o modal de cadastro
          template.hide();
          //atualiza a grid
          this.getAllVisitants();
          this.toastr.success('Inserido com sucesso!');
        }, error => {
          this.toastr.error(`Erro ao inserir cadastro: ${error}`);
        });
      } else {
        this.newVisitant = Object.assign({id: this.newVisitant.id}, this.registerForm.value);
        this.visitantService.editVisitant(this.newVisitant).subscribe(
        (obj: Visitant) => {
          //fecha o modal de cadastro
          template.hide();
          //atualiza a grid
          this.getAllVisitants();
          this.toastr.success('Atualizado com sucesso!');
        }, error => {
            this.toastr.error(`Erro ao atualizar cadastro: ${error}`);
        });
      }
    }
  }

  confirmeDelete(template: any) {
    this.visitantService.deleteVisitant(this.newVisitant.id).subscribe(
      () => {
          template.hide();
          this.getAllVisitants();
          this.toastr.success('Deletado com sucesso');
        }, error => {
          this.toastr.error(`Erro ao deletar: ${error}`);
        }
    );
  }

  isValid() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      cpf: ['', Validators.required],
      condominiumId: ['', Validators.required]
    });
  }
  openModal(template: any) {
    //zera o modal sempre que abre
    this.registerForm.reset();
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
      console.log(error);
      this.toastr.error(`Erro ao tentar carregar condôminos: ${error}`);
    });
  }

}

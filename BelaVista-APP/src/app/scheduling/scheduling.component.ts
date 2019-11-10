import { Component, OnInit } from '@angular/core';
import { Scheduling } from '../_models/Scheduling';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Condominium } from '../_models/Condominium';
import { CondominiumService } from '../_services/Condominium.service';
import { BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SchedulingService } from '../_services/Scheduling.service';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { Constants } from '../util/Constants';
import { DateTimeFormatPipePipe } from '../_helper/DateTimeFormatPipe.pipe';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  listSchedulings: Scheduling[];
  gridFiltered: Scheduling[];
  registerForm: FormGroup;
  //novo aviso
  newScheduling: Scheduling;
  bodyDeleteMessage: string;
  mode: string;
  tmpScheduling: Scheduling;

  listCondominiuns: Condominium[] = [];
  constructor(
      private condominiumService: CondominiumService
    , private modalService: BsModalService
    , private fb: FormBuilder
    , private toastr: ToastrService
    , private schedulingService: SchedulingService
    , private localeService: BsLocaleService
  ) {
    this.localeService.use('pt-br');
  }

  _filterGrid: string;
  get filterGrid(): string {
    return this._filterGrid;
  }

  set filterGrid(value: string) {
    this._filterGrid = value;
    this.gridFiltered = this._filterGrid.length > 0 ? this.searchSchedulingByFilter(this._filterGrid) : this.listSchedulings;
  }

  searchSchedulingByFilter(filtered: string) {
    if (filtered.length > 0) {
      filtered = filtered.toLowerCase();
      return this.listSchedulings.filter(
        scheduling => scheduling.condominium.name.toLowerCase().indexOf(filtered) !== -1
        );
    }
  }

  ngOnInit() {
    this.isValid();

    this.getAllSchedulings();
  }

  getAllSchedulings() {
    this.schedulingService.getAllSchedulingsAsync().subscribe(
      // tslint:disable-next-line: variable-name
      (_return: Scheduling[]) => {
          this.listSchedulings = _return;
          this.gridFiltered = this.listSchedulings;
      }
    , error => {
      console.log(error);
      this.toastr.error(`Erro ao tentar carregar avisos: ${error}`);
    });
  }

  saveScheduling(template: any) {
    this.mode = Constants.MODE_POST;
    this.getAllCondominiums();
    this.openModal(template);
  }

  editScheduling(scheduling: Scheduling, template: any) {
    this.listCondominiuns = [];
    this.mode = Constants.MODE_PUT;
    this.openModal(template);
    this.newScheduling = scheduling;
    //consulta o condomino pelo id
    this.condominiumService.GetCondominiumById(scheduling.condominiumId).subscribe(
      (obj: Condominium) => {
        this.listCondominiuns.push(obj);
      }, error => {
        this.toastr.error(`Erro ao consultar condomino: ${error}`);
      });
    //popula o modal com os dados de aviso

    this.registerForm.patchValue({
      name: scheduling.condominium.name,
      scheduleDate: scheduling.scheduleDate,
      description: scheduling.description,
      condominiumId: scheduling.condominium.id
    });
  }

  excluirScheduling(scheduling: Scheduling, template: any) {
    this.openModal(template);
    this.newScheduling = scheduling;
    this.bodyDeleteMessage = `Tem certeza que deseja excluir o agendamento: ${scheduling.description}, Código: ${scheduling.id}`;
  }

  saveEditScheduling(template: any) {
    if (this.isValid) {
      if (this.mode === Constants.MODE_POST) {
        this.newScheduling = Object.assign({}, this.registerForm.value);
        //verifica se nao existe agendamento para a data escolhida
        if (!this.validateDate(this.newScheduling.scheduleDate.toString())) {
          this.toastr.success('Data indisponível para agendamento');
        } else {
          this.schedulingService.saveScheduling(this.newScheduling).subscribe(
            (obj: Scheduling) => {
              //fecha o modal de cadastro
              template.hide();
              //atualiza a grid
              this.getAllSchedulings();
              this.toastr.success('Inserido com sucesso!');
            }, error => {
              this.toastr.error(`Erro ao inserir cadastro: ${error}`);
            });
        }
      } else {
        this.newScheduling = Object.assign({id: this.newScheduling.id}, this.registerForm.value);
        if (!this.validateDate(this.newScheduling.scheduleDate.toString())) {
          this.toastr.success('Data indisponível para agendamento');
        } else {
          this.schedulingService.editScheduling(this.newScheduling).subscribe(
            (obj: Scheduling) => {
              //fecha o modal de cadastro
              template.hide();
              //atualiza a grid
              this.getAllSchedulings();
              this.toastr.success('Atualizado com sucesso!');
            }, error => {
                this.toastr.error(`Erro ao atualizar cadastro: ${error}`);
            });
        }
      }
    }
  }

  confirmeDelete(template: any) {
    this.schedulingService.deleteScheduling(this.newScheduling.id).subscribe(
      () => {
          template.hide();
          this.getAllSchedulings();
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
      condominiumId: ['', Validators.required],
      scheduleStatusId: [''],
      scheduleTypeId: ['']
    });
  }
  openModal(template: any) {
    //zera o modal sempre que abre
    this.registerForm.reset();
    this.registerForm.patchValue({
      scheduleTypeId: 1,
      scheduleStatusId: 1
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
      console.log(error);
      this.toastr.error(`Erro ao tentar carregar condôminos: ${error}`);
    });
  }
  validateDate(scheduleDate: string) {
    console.log('data tostring');
    console.log(scheduleDate);
    this.schedulingService.getSchedulingByDate(scheduleDate).subscribe(
      (OBJ: Scheduling) => {
        this.tmpScheduling = OBJ;
      }, error => {
        console.log(error);
        this.toastr.error(`Erro ao validar data: ${error}`);
      });
    if (this.tmpScheduling != null) {
      return false;
    }
    return true;
  }
}

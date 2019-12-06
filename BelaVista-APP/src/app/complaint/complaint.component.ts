import { Component, OnInit } from '@angular/core';
import { Complaint } from '../_models/Complaint';
import { BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComplaintService } from '../_services/Complaint.service';
import { Condominium } from '../_models/Condominium';
import { CondominiumService } from '../_services/Condominium.service';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { Constants } from '../util/Constants';
import { AuthService } from '../_services/AuthService.service';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
  listComplaints: Complaint[];
  gridFiltered: Complaint[];
  registerForm: FormGroup;
  //novo aviso
  newComplaint: Complaint;
  bodyDeleteMessage: string;
  mode: string;

  listCondominiuns: Condominium[] = [];

  constructor(
    private complaintService: ComplaintService
  , private condominiumService: CondominiumService
  , private modalService: BsModalService
  , private fb: FormBuilder
  , private toastr: ToastrService
  , private localeService: BsLocaleService
  , private authService: AuthService
  ) {
    this.localeService.use('pt-br');
  }

  isAdmin(email: string) {
    if (this.authService.isAdmin()) {
      return true;
    }

    if (email === this.authService.currentUserValue.email) {
      return true;
    }
    return false;
  }

  // // tslint:disable-next-line: variable-name
  _filterGrid: string;
  get filterGrid(): string {
    return this._filterGrid;
  }

  set filterGrid(value: string) {
    this._filterGrid = value;
    this.gridFiltered = this._filterGrid.length > 0 ? this.searchComplaintByFilter(this._filterGrid) : this.listComplaints;
  }

  searchComplaintByFilter(filtered: string) {
    if (filtered.length > 0) {
      filtered = filtered.toLowerCase();
      return this.listComplaints.filter(
        complaint => complaint.condominium.name.toLowerCase().indexOf(filtered) !== -1
        );
    }
  }

  ngOnInit() {
    this.isValid();
    this.getAllComplaints();
  }

  getAllComplaints() {
    this.complaintService.getAllComplaintsAsync().subscribe(
      // tslint:disable-next-line: variable-name
      (_return: Complaint[]) => {
          this.listComplaints = _return;
          this.gridFiltered = this.listComplaints;
      }
    , error => {
      console.log(error);
      this.toastr.error(`Erro ao tentar carregar reclamações: ${error}`);
    });
  }
  saveComplaint(template: any) {
    this.mode = Constants.MODE_POST;
    this.getAllCondominiums();
    this.openModal(template);
  }

  editComplaint(complaint: Complaint, template: any) {
    this.listCondominiuns = [];
    this.mode = Constants.MODE_PUT;
    this.openModal(template);
    this.newComplaint = complaint;
    //consulta o condomino pelo id
    this.condominiumService.GetCondominiumById(complaint.condominiumId).subscribe(
      (obj: Condominium) => {
        this.listCondominiuns.push(obj);
      }, error => {
        this.toastr.error(`Erro ao consultar condômino: ${error}`);
      });
    //popula o modal com os dados de aviso
    this.registerForm.patchValue({
      isResolved: complaint.isResolved,
      occurrenceDate: complaint.occurrenceDate,
      description: complaint.description,
      condominiumId: complaint.condominium.id,
      condominium: complaint.condominium
    });
  }

  excluirComplaint(complaint: Complaint, template: any) {
    this.openModal(template);
    this.newComplaint = complaint;
    this.bodyDeleteMessage = `Tem certeza que deseja excluir a reclamação: ${complaint.description}, Código: ${complaint.id}`;
  }

  saveEditComplaint(template: any) {
    if (this.isValid) {
      if (this.mode === Constants.MODE_POST) {
        this.newComplaint = Object.assign({}, this.registerForm.value);
        console.log(this.registerForm);
        this.complaintService.saveComplaint(this.newComplaint).subscribe(
        (obj: Complaint) => {
          //fecha o modal de cadastro
          template.hide();
          //atualiza a grid
          this.getAllComplaints();
          this.toastr.success('Inserido com sucesso!');
        }, error => {
          this.toastr.error(`Erro ao inserir cadastro: ${error}`);
        });
      } else {
        this.newComplaint = Object.assign({id: this.newComplaint.id}, this.registerForm.value);
        this.complaintService.editComplaint(this.newComplaint).subscribe(
        (obj: Complaint) => {
          //fecha o modal de cadastro
          template.hide();
          //atualiza a grid
          this.getAllComplaints();
          this.toastr.success('Atualizado com sucesso!');
        }, error => {
            this.toastr.error(`Erro ao atualizar cadastro: ${error}`);
        });
      }
    }
  }

  confirmeDelete(template: any) {
    this.complaintService.deleteComplaint(this.newComplaint.id).subscribe(
      () => {
          template.hide();
          this.getAllComplaints();
          this.toastr.success('Deletado com sucesso');
        }, error => {
          this.toastr.error(`Erro ao deletar: ${error}`);
        }
    );
  }

  isValid() {
    this.registerForm = this.fb.group({
      occurrenceDate: ['', Validators.required],
      description: ['', Validators.required],
      condominiumId: ['', Validators.required],
      isResolved: ['']
    });
  }
  openModal(template: any) {
    //zera o modal sempre que abre
    this.registerForm.reset();
    this.registerForm.patchValue({
      isResolved: false
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
}

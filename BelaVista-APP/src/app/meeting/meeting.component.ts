import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../_services/Meeting.service';
import { BsModalService, BsLocaleService, defineLocale, ptBrLocale } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Meeting } from '../_models/Meeting';
import { Constants } from '../util/Constants';
import { FileServer } from 'file-saver';
import { AuthService } from '../_services/AuthService.service';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  constructor(
      private meetingService: MeetingService
    , private modalService: BsModalService
    , private fb: FormBuilder
    , private toastr: ToastrService
    , private localeService: BsLocaleService
    , private authService: AuthService) {
      this.localeService.use('pt-br');
    }

  listMeetings: Meeting[];
  gridFiltered: Meeting[];
  registerForm: FormGroup;
  // nova reunião
  newMeeting: Meeting;
  bodyDeleteMessage: string;
  mode: string;
  file: File;
  fileBlob: any;
  base64String: string;

  isAdmin() {
    if (this.authService.isAdmin()) {
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
    this.gridFiltered = this._filterGrid.length > 0 ? this.searchMeetingByFilter(this._filterGrid) : this.listMeetings;
  }

  searchMeetingByFilter(filtered: string): Meeting [] {
    if (filtered.length > 0) {
      filtered = filtered.toLowerCase();
      return this.listMeetings.filter(
          meeting => meeting.description.toLowerCase().indexOf(filtered) !== -1
      );
    }
  }

  ngOnInit() {
    this.isValid();
    this.getAllMeetings();
  }

  saveMeeting(template: any) {
    this.mode = Constants.MODE_POST;
    this.getAllMeetings();
    this.openModal(template);
  }

  editMeeting(meeting: Meeting, template: any) {
    this.listMeetings = [];
    this.mode = Constants.MODE_PUT;
    this.openModal(template);
    this.newMeeting = meeting;
    // popula o modal com os dados de aviso
    this.registerForm.patchValue({
      id: meeting.id,
      description: meeting.description,
      docAta: meeting.docAta,
      isCancel: meeting.isCancel,
      scheduleDate: meeting.scheduleDate
    });
  }

  excluirMeeting(meeting: Meeting, template: any) {
    this.openModal(template);
    this.newMeeting = meeting;
    this.bodyDeleteMessage = `Tem certeza que deseja excluir a reunião: ${meeting.description}, Código: ${meeting.id}`;
  }

  saveEditMeeting(template: any) {
    if (this.isValid) {
      if (this.mode === Constants.MODE_POST) {
        this.newMeeting = Object.assign({}, this.registerForm.value);
        this.newMeeting.docAta = this.fileBlob;
        this.meetingService.saveMeeting(this.newMeeting).subscribe(
        (obj: Meeting) => {
          // fecha o modal de cadastro
          template.hide();
          // atualiza a grid
          this.getAllMeetings();
          this.toastr.success('Inserido com sucesso!');
        }, error => {
          this.toastr.error(`Erro ao inserir cadastro: ${error}`);
        });
      } else {
        this.newMeeting = Object.assign({id: this.newMeeting.id}, this.registerForm.value);
        this.meetingService.editMeeting(this.newMeeting).subscribe(
        (obj: Meeting) => {
          // fecha o modal de cadastro
          template.hide();
          // atualiza a grid
          this.getAllMeetings();
          this.toastr.success('Atualizado com sucesso!');
        }, error => {
            this.toastr.error(`Erro ao atualizar cadastro: ${error}`);
        });
      }
    }
  }

  confirmeDelete(template: any) {
    this.meetingService.deleteMeeting(this.newMeeting.id).subscribe(
      () => {
          template.hide();
          this.getAllMeetings();
          this.toastr.success('Deletado com sucesso');
        }, error => {
          this.toastr.error(`Erro ao deletar: ${error}`);
        }
    );
  }

  isValid() {
    this.registerForm = this.fb.group({
      description: ['', Validators.required],
      isCancel: [''],
      scheduleDate: ['', Validators.required]
    });
  }
  openModal(template: any) {
    // zera o modal sempre que abre
    this.registerForm.reset();
    this.registerForm.patchValue({
      isCancel: false
    });
    template.show();
  }

  getAllMeetings() {
    this.meetingService.getAllMeetingsAsync().subscribe(
      (list: Meeting[]) => {
          this.listMeetings = list;
          this.gridFiltered = this.listMeetings;
      }
    , error => {
      this.toastr.error(`Erro ao tentar carregar condôminos: ${error}`);
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const type = file.type;
      const filaName = file.name;
      this.changeFile(file).then((base64: string): any => {
          this.base64String = base64;
          console.log(base64);
          this.fileBlob = new Blob([base64], {type: 'application/pdf'});
          console.log(this.fileBlob);
      });
  } else {
    this.toastr.error(`Erro ao tentar converter arquivo PDF`);
  }
}

  changeFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }
}

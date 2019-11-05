import { Component, OnInit } from '@angular/core';
import { Complaint } from '../_models/Complaint';
import { BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComplaintService } from '../_services/Complaint.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
  // listComplaints: Complaint[];
  // gridFiltered: Complaint[];
  // registerForm: FormGroup;

  constructor(
    private complaintService: ComplaintService
  , private modalService: BsModalService
  , private fb: FormBuilder
  , private toastr: ToastrService
  ) { }

  // // tslint:disable-next-line: variable-name
  // _filterGrid: string;
  // get filterGrid(): string {
  //   return this._filterGrid;
  // }

  // set filterGrid(value: string) {
  //   this._filterGrid = value;
  //   //this.gridFiltered = this._filterGrid.length > 0 ? this.searchCondominiumByFilter(this._filterGrid) : this.condominiuns;
  // }

  ngOnInit() {
    //this.getAllComplaints();
  }

  // getAllComplaints() {
  //   this.complaintService.getAllCondominiunsAsync().subscribe(
  //     // tslint:disable-next-line: variable-name
  //     (_return: Complaint[]) => {
  //         this.listComplaints = _return;
  //         this.gridFiltered = this.listComplaints;
  //         console.log(_return);
  //     }
  //   , error => {
  //     console.log(error);
  //     this.toastr.error(`Erro ao tentar carregar avisos: ${error}`);
  //   });
  // }

  // saveComplaint(template: any) {

  // }

  // editComplaint(complaint: Complaint, template: any) {

  // }

  // excluirComplaint(complaint: Complaint, template: any) {

  // }

  // saveEditComplaint(template: any) {

  // }

  // confirmeDelete(template: any) {

  // }
}

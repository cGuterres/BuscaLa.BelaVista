import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { CondominiumService } from '../_services/Condominium.service';
import { Condominium } from '../_models/Condominium';

@Component({
  selector: 'app-condominium',
  templateUrl: './condominium.component.html',
  styleUrls: ['./condominium.component.css']
})
export class CondominiumComponent implements OnInit {
  _filterGrid: string;
  get filterGrid(): string {
    return this._filterGrid;
  }
  
  set filterGrid(value: string){
    this._filterGrid = value;
    this.gridFiltered = this._filterGrid.length > 0 ? this.searchCondominiumByFilter(this._filterGrid) : this.condominiuns;
  }
  
  condominiuns: Condominium[];
  gridFiltered: Condominium[];

  constructor(private condominiumService: CondominiumService) { }
  
  ngOnInit() {
    //carrega a lista de condôminos
    this.getAllCondominiuns();
    //atribui a lista do BD a lista de filtrados
    this.gridFiltered = this.condominiuns;
  }

  getAllCondominiuns() {
    this.condominiumService.getAllCondominiunsAsync().subscribe(
    // tslint:disable-next-line: variable-name
    (_return: Condominium[]) => {
        this.condominiuns = _return;
        console.log(_return);
    }
  , error => {
    console.log(error);
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

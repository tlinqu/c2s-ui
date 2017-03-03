import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

import {ConsentService} from "../shared/consent.service";
import {PurposeOfUse} from "../shared/purpose-of-use";
import {PurposeOfUseService} from "./purpose-of-use.service";

@Component({
  selector: 'c2s-purpose-of-use',
  templateUrl: './purpose-of-use.component.html',
  styleUrls: ['./purpose-of-use.component.css']
})
export class PurposeOfUseComponent implements OnInit {
  @Output() selectedPurposeOfUse = new EventEmitter();
  @Input() purposeOfUsesCodes:string[];
  private purposeOfUSes: PurposeOfUse[];

  constructor(private consentService: ConsentService, private purposeOfUseService: PurposeOfUseService ) { }

  ngOnInit() {
    this.consentService.getPurposeOfUses()
                        .then(res => {
                            this.purposeOfUSes = res;
                            this.updatePurposeOfUseStatus();
                        })
                        .catch(this.error);
  }

  private updatePurposeOfUseStatus(){
    this.purposeOfUseService.updatePurposeOfUseStatus(this.purposeOfUsesCodes,this.purposeOfUSes);
  }

  private getSelectedPurposeOfUseCode():string[]{
    return this.purposeOfUseService.getSelectedPurposeOfUseCode(this.purposeOfUSes)
  }

  private error(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  closeDialog(dialog: any){
    dialog.close();
  }

  openDialog(dialog: any){
    dialog.open();
  }

  setSelectedPurposesOfUse(dialog: any){
    dialog.close();
    this.selectedPurposeOfUse.emit(this.getSelectedPurposeOfUseCode());
  }

  selectAll(){
    this.purposeOfUseService.setPurposeOfUseStatusToChecked(this.purposeOfUSes);
  }

  deSelectAll(){
    this.purposeOfUseService.setPurposeOfUseStatusToUnChecked(this.purposeOfUSes);
  }
}

import {Component, OnInit,Input} from '@angular/core';

import {Provider} from "../shared/Provider";
import {ConsentService} from "../shared/consent.service";
import {UtiltityService} from "../../shared/utiltity.service";

@Component({
  selector: 'c2s-select-providers',
  templateUrl: './select-providers.component.html',
  styleUrls: ['./select-providers.component.css']
})
export class SelectProvidersComponent implements OnInit {

  private providers: Provider[];
  authorizeTitle:string = "The following individual or organization";
  discloseTitle:string = "To disclose my information to";
  @Input() authorizeProvider: string[];
  @Input() disclosureProvider: string[] ;

  constructor(private consentService: ConsentService,private utiltityService:UtiltityService) { }

  ngOnInit() {
    this.consentService.getProviders()
      .then(res => this.providers = res)
      .catch(this.error);
  }

  private error(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  onSelectedAuthorizeProvider(provider:Provider){
    //Remove all entry from array
    this.utiltityService.removeAll(this.authorizeProvider);
    this.authorizeProvider.push(provider.npi);
  }

  onSelectedDisclosureProvider(provider:Provider){
    //Remove all entry from array
    this.utiltityService.removeAll(this.disclosureProvider);
    this.disclosureProvider.push(provider.npi);
  }

}

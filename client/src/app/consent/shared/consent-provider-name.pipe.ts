import { Pipe, PipeTransform } from '@angular/core';
import {Provider} from "./Provider";

@Pipe({
  name: 'consentProviderName'
})
export class ConsentProviderNamePipe implements PipeTransform {

  transform(provider: Provider, args?: any): any {
    let providerName: string;

    if (typeof provider !== 'undefined') {
      switch (provider.entityType.toString()) {
        case "Individual":
          providerName = provider.firstName + ' ' + provider.lastName;
          break;
        case "Organization":
          providerName = provider.orgName;
          break;
      }
      return providerName;
    }
  }
}
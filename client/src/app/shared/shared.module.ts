import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {Md2Module, Md2Tooltip} from "md2";
import {Ng2PaginationModule} from "ng2-pagination";
import {NgModule} from "@angular/core";
import {UsPhoneNumberPipe} from "./us-phone-number.pipe";
import {RouterModule} from "@angular/router";
import {UtilityService} from "./utility.service";
import {DataService} from "./data.service";
import {PageTitleComponent} from "./page-title/page-title.component";
import {ValidationService} from "./validation.service";
import {ControlMessagesComponent} from "./control-messages/control-messages.component";
import {C2sUiApiUrlService} from "./c2s-ui-api-url.service";

@NgModule({
  imports: [
    CommonModule,
    Md2Module,
    RouterModule
  ],
  declarations: [UsPhoneNumberPipe, PageTitleComponent, ControlMessagesComponent],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    Md2Module,
    Ng2PaginationModule,
    ReactiveFormsModule,
    UsPhoneNumberPipe,
    Md2Tooltip,
    PageTitleComponent,
    ControlMessagesComponent
  ],
  providers: [
    C2sUiApiUrlService,
    DataService,
    UtilityService,
    DatePipe,
    ValidationService
  ]
})

export class SharedModule {
}

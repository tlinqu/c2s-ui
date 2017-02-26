import {Component, OnInit, Input} from "@angular/core";
import {PaginationInstance} from "ng2-pagination";
import {ProviderSearchResponse} from "../shared/provider-search-response.model";

@Component({
  selector: 'c2s-provider-search-result',
  templateUrl: './provider-search-result.component.html',
  styleUrls: ['./provider-search-result.component.css']
})
export class ProviderSearchResultComponent implements OnInit {
  @Input() providerResult: ProviderSearchResponse;
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor() {
  }

  ngOnInit() {
  }

  onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }
}

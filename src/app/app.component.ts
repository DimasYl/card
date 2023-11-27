import {Component, OnInit} from '@angular/core';
import {ApiMockService} from "./data-access/api-mock.service";
import {PollCategory} from "./data-access/types";
import {StateService} from "./data-access/state.service";
import {HandlerService} from "./data-access/handler.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiMockService, StateService, HandlerService]
})
export class AppComponent implements OnInit {
  public selectCategory: PollCategory = {id: 999, alias: 'all', name: 'Все категории'};

  constructor(public readonly stateService: StateService) {
  }

  public ngOnInit(): void {
    this.stateService.getData();
  }

  public filterCategory(cat: PollCategory): void {
    this.selectCategory = cat
    this.stateService.polls = this.stateService.clonePolls.filter(el => el.category_id === cat.id)
  }

  public resetFilter(): void {
    this.stateService.polls = this.stateService.clonePolls
    this.selectCategory = {id: 999, alias: 'all', name: 'Все категории'};
  }
}

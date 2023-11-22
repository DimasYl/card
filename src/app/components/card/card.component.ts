import {Component, Input} from "@angular/core";
import {PollCategory, PollWithCategoryMeta} from "../../data-access/types";
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <span class="select-category">{{selectCategory.name}}</span>
    <div *ngIf="polls.length; else emptyTemplate" class="card">
      <div *ngFor="let poll of polls" class="poll-card">
        <div class="poll-content">
          <span class="voters-count">{{poll.voters_count}}</span>
          <div class="points">+ {{poll.points}}</div>
        </div>
        <img [ngSrc]="poll.image" width="400" loading="lazy" height="200" alt="" class="image">
        <div class="description">
          <img [ngSrc]="poll.category.smallIcon" loading="lazy" width="30" height="30" alt="">
          <span class="title"
                [style.background-color]="poll?.category?.backgroundColor">{{poll?.category?.name}}</span>
        </div>
        <h4>{{ poll.title }}</h4>
      </div>
    </div>
    <ng-template #emptyTemplate><h2 class="empty-card">По выбранной категории список пуст</h2></ng-template>
  `,
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input()
  public polls: PollWithCategoryMeta[] = []
  @Input()
  public selectCategory: PollCategory = {id: 999, alias: 'all', name: 'Все категории'};
}

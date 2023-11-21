import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CategoryMeta, PollCategory} from "../../data-access/types";
import {CommonModule} from "@angular/common";
import {ActiveBtnDirective} from "../../directive/select-btn.directive";
import {CatDirective} from "../../directive/cat.directive";

@Component({
  selector: 'app-filter-category',
  standalone: true,
  imports: [CommonModule, ActiveBtnDirective, CatDirective],
  template: `
    <div class="category">
      <div *ngFor="let cat of category">
        <button
          [appActiveBtn]="cat"
          [selectCat]="selectCategory"
          [appCat]="cat"
          [meta]="meta"
          (click)="onFilterCategory(cat)"
          class="filter-btn"
        >{{cat?.name}}</button>
      </div>
      <button
        class="reset-filter"
        (click)="onResetFilter()">Все категории
      </button>
    </div>
  `,
  styles: [
    `
      .category {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        flex-wrap: wrap;
        padding: 1rem 0;

        .filter-btn {
          cursor: pointer;
          border: none;
          padding: 4px;
          font-size: 16px;
          border-radius: 5px;
        }

        .reset-filter {
          background: rgb(0, 170, 159);
          cursor: pointer;
          border: none;
          padding: 2px;
          border-radius: 5px;
          box-shadow: 0 0 0 3px rgb(0, 170, 159);
          font-size: 16px
        }
      }

    `
  ],
})

export class FilterCategoryComponent {
  @Input()
  public category!: PollCategory[];
  @Input()
  public selectCategory: PollCategory = {id: 999, alias: 'all', name: 'Все категории'}
  @Input()
  public meta: CategoryMeta[] = [];
  @Output()
  public resetFilter = new EventEmitter()
  @Output()
  public filterCategory = new EventEmitter()

  public onResetFilter(): void {
    this.resetFilter.emit(true)
  }

  public onFilterCategory(cat: PollCategory): void {
    this.filterCategory.emit(cat)
  }
}

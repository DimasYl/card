import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ApiMockService} from "./data-access/api-mock.service";
import {HttpClientModule} from "@angular/common/http";
import {catchError, combineLatest, retry, throwError} from "rxjs";
import {CategoryMeta, PollCategory, PollWithCategoryMeta} from "./data-access/types";
import {FilterCategoryComponent} from "./components/filter-category/filter-category.component";
import {CardComponent} from "./components/card/card.component";
import {CatDirective} from "./directive/cat.directive";
import {ActiveBtnDirective} from "./directive/select-btn.directive";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, NgOptimizedImage, CatDirective, ActiveBtnDirective, FilterCategoryComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiMockService]
})
export class AppComponent implements OnInit {
  public polls: PollWithCategoryMeta[] = [];
  public clonePolls: PollWithCategoryMeta[] = [];
  public category: PollCategory[] = []
  public loading: boolean = true;
  public selectCategory: PollCategory = {id: 999, alias: 'all', name: 'Все категории'};
  public meta: CategoryMeta[] = []


  constructor(private readonly apiService: ApiMockService) {
  }

  public ngOnInit(): void {
    combineLatest(this.apiService.getCategories(),
      this.apiService.getPolls(),
      this.apiService.getCategoriesMeta()
    ).pipe(
      catchError((error) => {
        console.log(`Ошибка: ${error}`);
        return throwError(error);
      }),
      retry(1),
    ).subscribe(([cat, pol, meta]) => {
      this.category = cat;
      this.meta = meta

      const categoryWithMeta = cat.map(c => {
        const obj2 = meta.find(met => met.alias === c.alias);

        if (obj2) {
          return {...c, ...obj2};
        }

        return c;
      });

      this.polls = pol.map(p => {
        const obj2 = categoryWithMeta.find(m => m.id === p.category_id);

        if (obj2) {
          return {...p, category: obj2};
        }

        return p;
      }) as PollWithCategoryMeta[]

      this.clonePolls = this.polls
      this.loading = false
    })
  }

  filterCategory(cat: PollCategory) {
    this.selectCategory = cat
    this.polls = this.clonePolls.filter(el => el.category_id === cat.id)
  }

  resetFilter() {
    this.polls = this.clonePolls
    this.selectCategory = {id: 999, alias: 'all', name: 'Все категории'};
  }
}

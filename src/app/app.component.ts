import {Component, OnInit} from '@angular/core';
import {ApiMockService} from "./data-access/api-mock.service";
import {catchError, combineLatest, retry, throwError} from "rxjs";
import {CategoryMeta, Poll, PollCategory, PollWithCategoryMeta} from "./data-access/types";


@Component({
  selector: 'app-root',
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
   this.getMockData();
  }

  public filterCategory(cat: PollCategory): void {
    this.selectCategory = cat
    this.polls = this.clonePolls.filter(el => el.category_id === cat.id)
  }

  public resetFilter(): void {
    this.polls = this.clonePolls
    this.selectCategory = {id: 999, alias: 'all', name: 'Все категории'};
  }

  private getMockData(): void {
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

      const categoryWithMeta = this.createCategoryWithMeta(cat, this.meta)
      this.polls = this.createPollsWithCategory(pol, categoryWithMeta)

      this.clonePolls = this.polls
      this.loading = false
    })
  }
  private createCategoryWithMeta(cat: PollCategory[], meta: CategoryMeta[]): PollCategory[] {
    return cat.map(c => {
      const obj2 = meta.find(met => met.alias === c.alias);

      if (obj2) {
        return {...c, ...obj2};
      }

      return c;
    });
  }

  private createPollsWithCategory(pol: Poll[], categoryWithMeta: PollCategory[]): PollWithCategoryMeta[] {
    return pol.map(p => {
      const obj2 = categoryWithMeta.find(m => m.id === p.category_id);

      if (obj2) {
        return {...p, category: obj2};
      }

      return p;
    }) as PollWithCategoryMeta[]
  }
}

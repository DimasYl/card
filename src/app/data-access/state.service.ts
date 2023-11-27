import {Injectable} from "@angular/core";
import {HandlerService} from "./handler.service";
import {forkJoin, Observable} from "rxjs";
import {ApiMockService} from "./api-mock.service";
import {CategoryMeta, Poll, PollCategory, PollWithCategoryMeta} from "./types";

@Injectable()
export class StateService {
  public category: PollCategory[] = []
  public metaForCategory: CategoryMeta[] = []
  public polls: PollWithCategoryMeta[] = []
  public clonePolls: PollWithCategoryMeta[] = []
  public loading = true
  constructor(private handlerService: HandlerService, private readonly apiService: ApiMockService) {
  }

  public getData() :void {
    forkJoin([this.getCategory(), this.getPolls(), this.getCategoriesMeta() ])
      .subscribe(([cat, polls, meta]) => {
        this.category = cat;
        this.metaForCategory = meta

        const categoryWithMeta = this.createCategoryWithMeta()
        this.polls = this.createPollsWithCategory(polls, categoryWithMeta)

        this.clonePolls = this.polls
        this.loading = false

    })
  }

  private getCategory(): Observable<PollCategory[]> {
    return this.handlerService.requestErrorsAndRetry(this.apiService.getCategories())
  }

  private getPolls(): Observable<Poll[]> {
   return this.handlerService.requestErrorsAndRetry(this.apiService.getPolls())
  }

  private getCategoriesMeta(): Observable<CategoryMeta[]> {
   return this.handlerService.requestErrorsAndRetry(this.apiService.getCategoriesMeta())
  }


  private createCategoryWithMeta(): PollCategory[] {
   return this.category.map(c => {
      const obj2 = this.metaForCategory.find(meta => meta.alias === c.alias);

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

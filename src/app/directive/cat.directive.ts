import {Directive, HostBinding, Input, OnInit} from "@angular/core";
import {CategoryMeta, PollCategory} from "../data-access/types";

@Directive({
  selector: '[appCat][meta]',
  standalone: true,
})

export class CatDirective implements OnInit {
  @Input()
  public appCat!: PollCategory
  @Input()
  public meta!: CategoryMeta[]

  @HostBinding('style.background')
  public background!: string

  @HostBinding('style.boxShadow')
  public boxShadow!: string

  public ngOnInit(): void {
    this.background = <string>this?.meta.find(el => el?.alias === this.appCat?.alias)?.backgroundColor
    if (!this.background) this.background = 'grey'
    this.boxShadow = '0 0 0 3px ' + this.background
  }

}

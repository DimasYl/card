import {Directive, HostBinding, Input, OnInit} from "@angular/core";
import {PollCategory} from "../data-access/types";

@Directive({
  selector: '[appActiveBtn][selectCat]',
  standalone: true,
})

export class ActiveBtnDirective implements OnInit {
  @Input()
  public appActiveBtn!: PollCategory;

  @Input()
  public selectCat!: PollCategory

  @HostBinding('style.color')
  public color!: string;

  public ngOnInit(): void {
    if (this.appActiveBtn.alias === this.selectCat.alias) {
      this.color = 'white'
    } else this.color = 'black'
  }
}



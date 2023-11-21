import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {CatDirective} from "./directive/cat.directive";
import {ActiveBtnDirective} from "./directive/select-btn.directive";
import {FilterCategoryComponent} from "./components/filter-category/filter-category.component";
import {CardComponent} from "./components/card/card.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    NgOptimizedImage,
    CatDirective,
    ActiveBtnDirective,
    FilterCategoryComponent,
    CardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

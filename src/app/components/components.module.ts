import { PipesModule } from './../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { CardComponent } from './card/card.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { FormsModule } from '@angular/forms';
import { PercentComponent } from './percent/percent.component';
import { AlertComponent } from './alert/alert.component';
import { ImageContentComponent } from './image-content/image-content.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    CarouselComponent,
    CardComponent,
    InputSearchComponent,
    PercentComponent,
    AlertComponent,
    ImageContentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PipesModule,
    InfiniteScrollModule
  ],
  exports: [
    CarouselComponent,
    InputSearchComponent,
    CardComponent,
    AlertComponent,
    PercentComponent,
    ImageContentComponent,
  ]
})
export class ComponentsModule { }

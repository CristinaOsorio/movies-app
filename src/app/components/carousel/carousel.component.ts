import { MoviesService } from 'src/app/services';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/response-search.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Input() title!: string;
  @Input() type!: string;
  page: number = 1;

  constructor(private movieService: MoviesService) {
  }

  ngOnInit(): void {
  }

  onScroll() {
    this.page = this.page + 1;
    this.movieService.searchByQuery(this.type, this.page)
      .subscribe(data => {
        const newMovies = data.results;
        this.movies = [...this.movies, ...newMovies];
      })
  }

}

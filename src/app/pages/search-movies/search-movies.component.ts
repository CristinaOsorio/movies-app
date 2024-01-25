import { map, concatMap, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.css']
})
export class SearchMoviesComponent implements OnInit {
  movies: Movie[] = [];
  page: number = 1;
  search: string = '';
  filters: { [key: string]: string } = {
    order_by: 'popularity.asc',
    with_genres: '',
    with_text_query: ''
  }

  constructor(private moviesService: MoviesService, private activateddRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateddRoute.queryParams.pipe(
      concatMap(({ query }) => {
        if (query) {
          this.filters['with_text_query'] = query
          return this.moviesService
            .discoverMovies(this.filters)
            .pipe(map(data => data.results))
        }
        return of([]);
      })
    ).subscribe(data => this.movies = data);
  }

  setValues(filters: { [key: string]: string }) {
    this.filters = { ...this.filters, ...filters };
    this.page = 1;
    this.moviesService.discoverMovies({ ...filters })
      .subscribe(values => this.movies = values.results);
  }

  loadMoviesMore() {
    this.page = this.page + 1;
    this.moviesService.discoverMovies({ ...this.filters, page: String(this.page) })
      .subscribe(values => this.movies = [...this.movies, ...values.results]);
  }


}

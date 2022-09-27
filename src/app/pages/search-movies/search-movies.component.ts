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


  constructor(private moviesService: MoviesService, private activateddRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateddRoute.queryParams.pipe(
      concatMap(({ query }) => {
        return (query)
          ? this.moviesService.searchByQuery(query).pipe(map(data => data.results))
          : of([])
      })
    ).subscribe(data => {
      this.movies = data
    })
  }



}

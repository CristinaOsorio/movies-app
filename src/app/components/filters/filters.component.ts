import { map } from 'rxjs';
import { MoviesService } from 'src/app/services';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

interface OrderBy {
  name: string,
  field: string,
  direction: 'asc' | 'desc'
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  ordersBy: OrderBy[] = [
    { name: 'Popularidad/Ascendiente', field: 'popularity', direction: 'asc' },
    { name: 'Popularidad/Descendente', field: 'popularity', direction: 'desc' },
    { name: 'Calificación/Ascendiente', field: 'vote_count', direction: 'asc' },
    { name: 'Calificación/Descendente', field: 'vote_count', direction: 'desc' },
    { name: 'Fecha de estreno/Ascendiente', field: 'release_date', direction: 'asc' },
    { name: 'Fecha de estreno/Descendente', field: 'release_date', direction: 'desc' }
  ];


  @Output() onValues = new EventEmitter<{ [key: string]: string }>();

  genres!: any[];

  orderBy: number = 0;


  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.moviesService.getAllGenre()
      .pipe(
        map(genres => {
          return genres.map(genre => {
            return { ...genre, checkbox: false }
          })
        })
      ).subscribe((genre) => (this.genres = [...genre]));
  }

  onSubmit(form: NgForm) {
    let { orderBy, genres } = form.value;
    const sort_by = this.ordersBy[orderBy];

    const genreIds: string = Object.entries(genres)
      .filter(([key, value]) => (value == true))
      .map(([key, value]) => key)
      .toString()
      .replace(',', '|');

    this.onValues.emit({
      sort_by: `${sort_by.field}.${sort_by.direction}`,
      with_genres: genreIds
    })
  }

}

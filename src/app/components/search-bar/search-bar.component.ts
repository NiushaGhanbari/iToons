import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, debounceTime, startWith, switchMap } from 'rxjs';
import { MusicApiService } from '../../core/services/music-api.service';
import { SortAlbumsComponent } from '../sort-albums/sort-albums.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    SortAlbumsComponent,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output() onSearch = new EventEmitter();
  public myControl = new FormControl('');
  public filteredOptions!: Observable<any[]>;

  constructor(
    private musicApiService: MusicApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((val) => (val ? this.musicApiService.getArtists(val) : []))
    );
  }

  onOptionSelected() {
    this.onSearch.emit(this.myControl.value);
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
}

import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sort-albums',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './sort-albums.component.html',
  styleUrl: './sort-albums.component.scss',
})
export class SortAlbumsComponent {
  constructor(private router: Router) {}
  sortAlbums(event: MatSelectChange) {
    this.router.navigate(['/'], {
      queryParams: { sortType: event.value },
    });
  }
}

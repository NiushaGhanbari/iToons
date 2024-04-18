import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '../../core/models/album.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss',
})
export class AlbumCardComponent {
  @Input() album!: Album;
  constructor(private router: Router) {}
  navigateToAlbumDetail(collectionId: number) {
    this.router.navigate([`/${collectionId}`]);
  }
}

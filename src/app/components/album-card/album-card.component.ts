import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResizeImagePipe } from '../../helpers/resize-image.pipe';
import { Album } from '../../core/models/album.types';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [CommonModule, ResizeImagePipe],
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

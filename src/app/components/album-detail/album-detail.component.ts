import { Component } from '@angular/core';
import { MusicApiService } from '../../core/services/music-api.service';
import { ActivatedRoute } from '@angular/router';
import { MusicTrack } from '../../core/models/music-track.types';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ResizeImagePipe } from '../../helpers/resize-image.pipe';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ResizeImagePipe,
  ],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss',
})
export class AlbumDetailComponent {
  public albumDetail$!: Observable<MusicTrack[]>;
  constructor(
    private musicApiService: MusicApiService,
    private route: ActivatedRoute
  ) {
    this.route?.paramMap.subscribe((params) => {
      const collectionId = params.get('collectionId');
      if (collectionId) this.getAlbumTracks(collectionId);
    });
  }

  getAlbumTracks(collectionId: string) {
    this.albumDetail$ = this.musicApiService.getAlbumTracks(collectionId);
  }

  playAudio(audio: HTMLAudioElement): void {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}

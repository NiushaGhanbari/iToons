import { Component } from '@angular/core';
import { MusicApiService } from '../../core/services/music-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ResizeImagePipe } from '../../helpers/resize-image.pipe';
import { WrapperType } from '../../core/constants/wrapper-type';
import { AlbumOrTrackResponse } from '../../core/models/common.types';
import { Album } from '../../core/models/album.types';
import { MusicTrack } from '../../core/models/music-track.types';

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
  private destroy$ = new Subject();
  public albumDetail$!: Observable<AlbumOrTrackResponse[]>;
  public album!: Album;
  public tracks!: MusicTrack[];
  constructor(
    private musicApiService: MusicApiService,
    private route: ActivatedRoute
  ) {
    this.route?.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const collectionId = params.get('collectionId');
      if (collectionId) this.getAlbumTracks(collectionId);
    });
  }

  getAlbumTracks(collectionId: string) {
    this.musicApiService
      .getAlbumTracks(collectionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.album = data.filter(
          (data) => data.wrapperType === WrapperType.Collection
        )[0] as Album;
        this.tracks = data.filter(
          (data) => data.wrapperType === WrapperType.Track
        ) as MusicTrack[];
      });
  }

  playAudio(audio: HTMLAudioElement): void {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

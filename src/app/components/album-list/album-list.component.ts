import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MusicApiService } from '../../core/services/music-api.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Observable,
  Subject,
  finalize,
  map,
  mergeMap,
  takeUntil,
  toArray,
} from 'rxjs';
import { Album } from '../../core/models/album.types';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { WrapperType } from '../../core/constants/wrapper-type';
import { ArtistOrAlbumResponse } from '../../core/models/common.types';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    SearchBarComponent,
    AlbumCardComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss',
})
export class AlbumListComponent {
  private destroy$ = new Subject();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  public albums$!: Observable<Album[]>;
  public isLoading: boolean = false;
  public displayNumber: number = 15;
  public popularAlbums$!: Observable<Album[]>;
  public popularAlbums!: Album[];
  constructor(
    private musicApiService: MusicApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params) {
          const sortType = params['sortType'] as keyof Album;
          if (this.albums$) {
            this.albums$ = this.sort(this.albums$, sortType);
          } else if (this.popularAlbums$) {
            this.popularAlbums$ = this.sort(this.popularAlbums$, sortType);
          }
        }
      });

    this.getPopularArtists();
  }

  sort(
    albums$: Observable<Album[]>,
    sortType: keyof Album
  ): Observable<Album[]> {
    return albums$.pipe(
      map((albums: Album[]) => {
        return albums.sort((a, b) => {
          const aValue = a[sortType];
          const bValue = b[sortType];
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue);
          } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            return aValue - bValue;
          }
          return 0;
        });
      })
    );
  }

  loadAlbums(artistName: string) {
    this.isLoading = true;
    this.albums$ = this.musicApiService
      .getAlbums(artistName)
      .pipe(finalize(() => (this.isLoading = false)));
  }
  getPopularArtists() {
    this.popularAlbums$ = this.musicApiService.getArtistAlbums().pipe(
      mergeMap(
        (items: ArtistOrAlbumResponse[]) =>
          items.filter(
            (item) => item.wrapperType === WrapperType.Collection
          ) as Album[]
      ),
      toArray()
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const element = this.scrollContainer.nativeElement;
    const scrollPosition = window.scrollY + window.innerHeight;
    if (scrollPosition > element.scrollHeight - 2) {
      this.displayNumber += 15;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

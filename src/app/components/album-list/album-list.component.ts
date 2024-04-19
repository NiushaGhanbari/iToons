import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ApiAlbumService } from '../../core/services/album.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, finalize, map } from 'rxjs';
import { Album } from '../../core/models/album.types';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

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
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  public albums$!: Observable<Album[]>;
  public isLoading: boolean = false;
  public displayNumber: number = 15;
  public popularAlbums$!: Observable<Album[]>;
  constructor(
    private apiAlbumService: ApiAlbumService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
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
    this.albums$ = this.apiAlbumService
      .getAlbums(artistName)
      .pipe(finalize(() => (this.isLoading = false)));
  }
  getPopularArtists() {
    this.popularAlbums$ = this.apiAlbumService.getPopularArtists();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const element = this.scrollContainer.nativeElement;
    const scrollPosition = window.scrollY + window.innerHeight;
    if (scrollPosition > element.scrollHeight - 2) {
      this.displayNumber += 15;
    }
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumListComponent } from './album-list.component';
import { MusicApiService } from '../../core/services/music-api.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
  let musicApiServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(() => {
    musicApiServiceMock = {
      getAlbums: jasmine.createSpy().and.returnValue(of([])),
      getArtistAlbums: jasmine.createSpy().and.returnValue(of([])),
    };
    activatedRouteMock = {
      queryParams: of(convertToParamMap({ sortType: 'name' })),
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SearchBarComponent,
        AlbumCardComponent,
        MatProgressSpinnerModule,
        AlbumListComponent,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MusicApiService, useValue: musicApiServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort albums by string property `artistName`', () => {
    const albumsObservable = of([
      {
        wrapperType: 'album',
        collectionId: 2,
        artistName: 'Zebra',
        collectionName: 'Zebra Greatest Hits',
        artworkUrl100: 'url/to/zebra/image.jpg',
        collectionPrice: 29.99,
        releaseDate: '2021-01-01',
      },
      {
        wrapperType: 'album',
        collectionId: 1,
        artistName: 'Apple',
        collectionName: 'Apple Album One',
        artworkUrl100: 'url/to/apple/image.jpg',
        collectionPrice: 19.99,
        releaseDate: '2021-02-01',
      },
    ]);

    component.sort(albumsObservable, 'artistName').subscribe((sortedAlbums) => {
      expect(sortedAlbums[0].artistName).toBe('Apple');
      expect(sortedAlbums[1].artistName).toBe('Zebra');
    });
  });
});

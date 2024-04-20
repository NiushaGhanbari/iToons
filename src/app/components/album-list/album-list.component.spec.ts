import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumListComponent } from './album-list.component';
import { MusicApiService } from '../../core/services/music-api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
  let mockMusicApiService: jasmine.SpyObj<MusicApiService>;
  let mockRoute: any;

  beforeEach(async () => {
    mockMusicApiService = jasmine.createSpyObj('MusicApiService', [
      'getArtistAlbums',
    ]);
    mockRoute = {
      queryParams: of({ sortType: 'name' }), // Simulating route query params
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [NoopAnimationsModule, AlbumListComponent], // Add this line
      providers: [
        { provide: MusicApiService, useValue: mockMusicApiService },
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch popular artists on init', () => {
    expect(mockMusicApiService.getArtistAlbums).toHaveBeenCalled();
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

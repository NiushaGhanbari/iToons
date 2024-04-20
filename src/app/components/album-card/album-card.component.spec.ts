import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumCardComponent } from './album-card.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResizeImagePipe } from '../../helpers/resize-image.pipe';
import { Album } from '../../core/models/album.types';

describe('AlbumCardComponent', () => {
  let component: AlbumCardComponent;
  let fixture: ComponentFixture<AlbumCardComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, AlbumCardComponent, ResizeImagePipe],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input properties', () => {
    const testAlbum: Album = {
      wrapperType: 'music',
      collectionId: 12345,
      artistName: 'Test Artist',
      collectionName: 'Test Collection',
      artworkUrl100: 'http://example.com/test.jpg',
      collectionPrice: 15.99,
      releaseDate: '2023-04-20',
    };
    component.album = testAlbum;
    fixture.detectChanges();
    expect(component.album.collectionId).toEqual(12345);
    expect(component.album.artistName).toEqual('Test Artist');
    expect(component.album.collectionPrice).toEqual(15.99);
  });

  it('should navigate to album detail', () => {
    const collectionId = 123;
    component.navigateToAlbumDetail(collectionId);
    expect(router.navigate).toHaveBeenCalledWith([`/${collectionId}`]);
  });
});

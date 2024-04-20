import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumDetailComponent } from './album-detail.component';
import { MusicApiService } from '../../core/services/music-api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AlbumDetailComponent', () => {
  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;
  let mockMusicApiService: jasmine.SpyObj<MusicApiService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockMusicApiService = jasmine.createSpyObj('MusicApiService', [
      'getAlbumTracks',
    ]);
    mockActivatedRoute = {
      paramMap: of(new Map([['collectionId', '12345']])),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, AlbumDetailComponent],
      providers: [
        { provide: MusicApiService, useValue: mockMusicApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAlbumTracks', () => {
    const collectionId = '12345';
    expect(mockMusicApiService.getAlbumTracks).toHaveBeenCalledWith(
      collectionId
    );
  });

  it('should play audio if paused', () => {
    const audioElement = new Audio();
    spyOnProperty(audioElement, 'paused', 'get').and.returnValue(true);
    spyOn(audioElement, 'play').and.callFake(() => Promise.resolve());

    component.playAudio(audioElement);
    expect(audioElement.play).toHaveBeenCalled();
  });

  it('should pause and reset audio if playing', () => {
    const audioElement = new Audio();
    spyOnProperty(audioElement, 'paused', 'get').and.returnValue(false);
    spyOn(audioElement, 'pause').and.callThrough();
    spyOn(audioElement, 'play').and.callFake(() => Promise.resolve());

    component.playAudio(audioElement);
    expect(audioElement.pause).toHaveBeenCalled();
    expect(audioElement.currentTime).toEqual(0);
  });
});

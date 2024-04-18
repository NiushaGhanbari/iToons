import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCardComponent } from './album-card.component';
import { Album } from '../../core/models/album.types';
import { Router } from '@angular/router';

describe('AlbumCardComponent', () => {
  let component: AlbumCardComponent;
  let fixture: ComponentFixture<AlbumCardComponent>;

  beforeEach(async () => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };
    await TestBed.configureTestingModule({
      imports: [AlbumCardComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

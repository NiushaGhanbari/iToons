import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './search-bar.component';
import { MusicApiService } from '../../core/services/music-api.service';
import { Router } from '@angular/router';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let mockMusicApiService: jasmine.SpyObj<MusicApiService>;

  beforeEach(async () => {
    mockMusicApiService = jasmine.createSpyObj('MusicApiService', [
      'getArtists',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatAutocompleteModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        SearchBarComponent,
      ],
      providers: [{ provide: MusicApiService, useValue: mockMusicApiService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty initial control value', () => {
    expect(component.myControl.value).toBe('');
  });

  it('should not call getArtists on value change with empty input', () => {
    component.myControl.setValue('');
    fixture.detectChanges();

    expect(mockMusicApiService.getArtists).not.toHaveBeenCalled();
  });

  it('should emit onSearch event when onOptionSelected is called', () => {
    spyOn(component.onSearch, 'emit');
    component.myControl.setValue('selectedValue');
    component.onOptionSelected();

    expect(component.onSearch.emit).toHaveBeenCalledWith('selectedValue');
  });
  it('should navigate to home when navigateToHome is called', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.navigateToHome();

    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});

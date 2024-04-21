import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Album } from '../models/album.types';
import { Artist } from '../models/artist.types';
import { MusicTrack } from '../models/music-track.types';
import { ApiEntity } from '../constants/api-constants';
import {
  AlbumOrTrackResponse,
  ArtistOrAlbumResponse,
} from '../models/common.types';

/**
 * Service to handle API operations related to music data retrieval from iTunes.
 */
@Injectable({
  providedIn: 'root',
})
export class MusicApiService {
  private readonly API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetches artists matching the search term from the iTunes API.
   * @param artist The search term to look up artists.
   * @returns An Observable of Artist array.
   */
  getArtists(artist: string): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>(`${this.API_URL}/search`, {
      params: { entity: ApiEntity.AllArtist, term: artist },
    });
  }

  /**
   * Fetches albums matching the search term from the iTunes API.
   * @param album The search term to look up albums.
   * @returns An Observable of Album array.
   */
  getAlbums(album: string): Observable<Album[]> {
    return this.httpClient.get<Album[]>(`${this.API_URL}/search`, {
      params: { entity: ApiEntity.Album, term: album },
    });
  }

  /**
   * Fetches tracks for a given album using its collection ID from the iTunes API.
   * @param collectionId The unique identifier for the album collection.
   * @returns An Observable of AlbumOrTrackResponse array.
   */
  getAlbumTracks(collectionId: string): Observable<AlbumOrTrackResponse[]> {
    return this.httpClient.get<MusicTrack[]>(`${this.API_URL}/lookup`, {
      params: { entity: ApiEntity.Song, id: collectionId },
    });
  }

  /**
   * Fetches albums for a predefined set of "my popular" artists. I have used these IDs
   * (3177510, 347307, 2487752) to show them on the main page as an example. This method
   * retrieves 10 albums for these artists.
   * @returns An Observable of ArtistOrAlbumResponse array.
   */
  getArtistAlbums(): Observable<ArtistOrAlbumResponse[]> {
    const params = {
      amgArtistId: '3177510,347307,2487752',
      entity: ApiEntity.Album,
      limit: '10',
    };
    return this.httpClient.get<ArtistOrAlbumResponse[]>(
      `${this.API_URL}/lookup`,
      { params }
    );
  }
}

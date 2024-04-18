import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album.types';
import { Artist } from '../models/artist.types';
import { MusicTrack } from '../models/music-track.types';

@Injectable({
  providedIn: 'root',
})
export class ApiAlbumService {
  constructor(private httpClient: HttpClient) {}

  API = 'https://itunes.apple.com';

  getArtists(artist: string): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>(`${this.API}/search`, {
      params: { entity: 'allArtist', term: artist },
    });
  }
  getAlbums(album: string): Observable<Album[]> {
    return this.httpClient.get<Album[]>(`${this.API}/search`, {
      params: { entity: 'album', term: album },
    });
  }
  getAlbumTracks(collectionId: string): Observable<MusicTrack[]> {
    return this.httpClient.get<MusicTrack[]>(`${this.API}/lookup`, {
      params: { entity: 'song', id: collectionId },
    });
  }
  getPopularArtists(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(`${this.API}/lookup`, {
      params: {
        amgArtistId: '3177510,347307,2487752',
        entity: 'album',
        limit: '10',
      },
    });
  }
}

import { Artist } from './artist.types';
import { Album } from './album.types';
import { MusicTrack } from './music-track.types';

export type ArtistOrAlbumResponse = Artist | Album;
export type AlbumOrTrackResponse = Album | MusicTrack;

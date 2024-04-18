import { Routes } from '@angular/router';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';

export const routes: Routes = [
  { path: '', component: AlbumListComponent },
  { path: ':collectionId', component: AlbumDetailComponent },
];

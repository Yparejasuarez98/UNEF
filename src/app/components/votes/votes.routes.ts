import { Routes } from '@angular/router';
import { VotesComponent } from './votes.component';
import { VoteDetailComponent } from '../vote-detail/vote-detail.component';

export const VOTES_ROUTES: Routes = [
    {
        path: '',
        component: VotesComponent
    },
    {
        path: 'detalle',
        component: VoteDetailComponent
    }
]
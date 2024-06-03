import { Routes } from '@angular/router';
import { VotesComponent } from './votes.component';
import { VoteDetailComponent } from '../vote-detail/vote-detail.component';
import { VotesAdminComponent } from '../votes-admin/votes-admin.component';
import { isLoggedInGuard } from '../../core/guards/is-logged-in.guard';

export const VOTES_ROUTES: Routes = [
    {
        path: '',
        component: VotesComponent,
        // canMatch: [isLoggedInGuard],
    },
    {
        path: '',
        component: VotesAdminComponent
    },
    {
        path: 'detalle',
        component: VoteDetailComponent
    }
]
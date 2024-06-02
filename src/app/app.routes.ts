import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { VotesMixtaComponent } from './components/votes-mixta/votes-mixta.component';
import { ViewResultComponent } from './components/votes-mixta/view-result/view-result.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'votos' },
    { path: 'login', component: LoginComponent },
    {
        path: 'votos',
        loadChildren: () => import('./components/votes/votes.routes').then(m => m.VOTES_ROUTES)
    },
    // { path: 'Votaciones', component: VotesMixtaComponent, canActivate: [isLoggedInGuard] },
    { path: 'resultados', loadChildren: () => import('./components/votes-mixta/votes-mixta.routes').then(m => m.VOTES_MIXTA_ROUTES)},
];

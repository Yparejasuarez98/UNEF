import { Routes } from '@angular/router';
import { ViewResultComponent } from './view-result/view-result.component';
import { isLoggedInGuard } from '../../core/guards/is-logged-in.guard';
import { VotesMixtaDetalleComponent } from './votes-mixta-detalle/votes-mixta-detalle.component';
import { VotesMixtaComponent } from './votes-mixta.component';


export const VOTES_MIXTA_ROUTES: Routes = [
    {
        path: '',
        component: ViewResultComponent,
        canMatch: [isLoggedInGuard],
    },
    
    {
        path: 'ver-detalle',
        component: VotesMixtaDetalleComponent
    },

    {
        path: 'votaciones',
        component: VotesMixtaComponent
    }
]
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { HomeComponent } from "./pages/home/home.component";
import { UserComponent } from './pages/user/user.component';

const APP_ROUTES: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'users', component: UserComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['ADMIN','USER']
            }
        }
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: 'home',
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
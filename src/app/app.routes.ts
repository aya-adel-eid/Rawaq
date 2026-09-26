import { Routes } from '@angular/router';

export const routes: Routes = [
    // auth routes
    {
        path:'',loadChildren:()=>import('./features/auth/auth.routes').then(m=>m.AUTH_ROUtES)
    }
];

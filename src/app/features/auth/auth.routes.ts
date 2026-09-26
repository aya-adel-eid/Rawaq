import { Routes } from "@angular/router";

export const AUTH_ROUtES:Routes=[
    {
path:'sign-up',loadComponent:()=>import('./pages/register-page/register-page.component').then(m=>m.RegisterPageComponent),title:'Sign Up'
    },
    {
        path:'sign-in',loadComponent:()=>import('./pages/login-page/login-page.component').then(m=>m.LoginPageComponent),title:'Sign In'
    },{
        path:'reset-password',loadComponent:()=>import('./pages/reset-password-page/reset-password-page.component').then(m=>m.ResetPasswordPageComponent),title:'Reset Password'
    }
]
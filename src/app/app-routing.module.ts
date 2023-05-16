import { NgModule } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';

// dominio.com
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@modules/auth').then((m) => m.AuthModule)

  },
  {
    path: 'heroes',
    loadChildren: () => import('@modules/heroes').then((m) => m.HeroesModule)
    
  },
  // ruta '' /heroes
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  // ruta 404 error 404
  {
    path: '404',
    loadComponent: () => import('@shared/pages/eror404-page').then((m) => m.Eror404PageComponent)
    
  },
  // rurta '**' 404
  {
    path: '**',
    redirectTo: '404'
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

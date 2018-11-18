import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CupcakesComponent } from './cupcakes/cupcakes.component';
import { UpdateComponent } from './update/update.component';
import { CupcakeComponent } from './cupcake/cupcake.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cupcakes', component: CupcakesComponent },
  { path: 'edit/:id', component: UpdateComponent },
  { path: 'cupcake/:id', component: CupcakeComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });

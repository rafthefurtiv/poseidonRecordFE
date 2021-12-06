import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AtletiComponent } from './atleti/atleti.component';

const routes: Routes = [
{ path: '', component: LoginComponent},
{ path: 'menu', component: MenuComponent},
{ path: 'atleti', component: AtletiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

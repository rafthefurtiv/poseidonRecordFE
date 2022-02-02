import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AtletiComponent } from './atleti/atleti.component';
import { SocietariComponent } from './societari/societari.component';
import { AddRecordComponent } from './add-record/add-record.component';

const routes: Routes = [
{ path: '', component: LoginComponent},
{ path: 'menu', component: MenuComponent},
{ path: 'add-record', component: AddRecordComponent},
{ path: 'atleti', component: AtletiComponent},
{ path: 'societari', component: SocietariComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AtletiComponent } from './atleti/atleti.component';
import { SocietariComponent } from './societari/societari.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { StartListComponent } from './start-list/start-list.component';
import { MacchineComponent } from './macchine/macchine.component';
import { PizzaComponent } from './pizza/pizza.component';
import { PalestraComponent } from './palestra/palestra.component';

const routes: Routes = [
{ path: '', component: LoginComponent},
{ path: 'menu', component: MenuComponent},
{ path: 'add-record', component: AddRecordComponent},
{ path: 'atleti', component: AtletiComponent},
{ path: 'start-list', component: StartListComponent},
{ path: 'macchine', component: MacchineComponent},
{ path: 'societari', component: SocietariComponent},
{ path: 'pizza', component: PizzaComponent},
{ path: 'app-palestra', component: PalestraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

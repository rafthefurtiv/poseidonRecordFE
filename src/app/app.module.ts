import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MenuComponent } from './menu/menu.component';
import {MatCardModule} from '@angular/material/card';
import { AtletiComponent } from './atleti/atleti.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AddRecordComponent } from './add-record/add-record.component';
import { FormsModule } from '@angular/forms';
import { SocietariComponent } from './societari/societari.component';
import { StartListComponent } from './start-list/start-list.component';
import {CookieService} from 'ngx-cookie-service';
import { MacchineComponent } from './macchine/macchine.component';
import { MacchinaComponent } from './macchina/macchina.component';
import { VeicoloPasseggeriComponent } from './veicolo-passeggeri/veicolo-passeggeri.component';
import { HeaderComponent } from './header/header.component';
import { PizzaComponent } from './pizza/pizza.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    AtletiComponent,
    AddRecordComponent,
    SocietariComponent,
    StartListComponent,
    MacchineComponent,
    MacchinaComponent,
    VeicoloPasseggeriComponent,
    HeaderComponent,
    PizzaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatAutocompleteModule,
    MatTableModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatExpansionModule
  ],
  providers: [CookieService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

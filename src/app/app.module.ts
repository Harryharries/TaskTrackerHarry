import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTaskDBService } from 'app/mockAPI/inMemoryTaskDB.service';

import { AppComponent } from './app.component';

import { routes } from './app.routes';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryTaskDBService, { delay: 500 }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

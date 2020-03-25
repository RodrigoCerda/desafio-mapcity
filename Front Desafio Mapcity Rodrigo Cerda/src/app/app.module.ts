import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { MapComponent } from './map/map.component';
import { SignupComponent } from './signup/signup.component';

import { FormsModule } from '@angular/forms';;
import { RegisterComponent } from './register/register.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        MapComponent,
        SignupComponent
,
        RegisterComponent    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

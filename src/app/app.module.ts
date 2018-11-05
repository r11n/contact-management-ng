import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialImportModule } from './core/theme_modules/materialimport.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UiModule } from './ui/ui.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialImportModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

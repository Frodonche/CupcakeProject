import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatOptionModule,
  MatSelectModule,
  MatGridListModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CupcakeComponent } from './cupcake/cupcake.component';
import { CupcakesComponent } from './cupcakes/cupcakes.component';
import { UpdateComponent } from './update/update.component';
import { CardComponent } from './shared/card/card.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { FormComponent } from './shared/form/form.component';
import { NaPipe } from './shared/pipes/na.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CupcakeComponent,
    CupcakesComponent,
    UpdateComponent,
    CardComponent,
    DialogComponent,
    FormComponent,
    NaPipe

  ],
  entryComponents: [ DialogComponent ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

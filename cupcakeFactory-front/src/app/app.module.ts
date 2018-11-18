import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

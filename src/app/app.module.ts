import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import{ ProcessHTTPMsgService } from './services/process-httpmsg.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{MatSliderModule} from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FlexLayoutModule } from '@angular/flex-layout';


import  'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import{ LeaderService } from './services/leader.service';

import {AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';


import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { HighlightDirective } from './directives/highlight.directive';
import { FeedbackService } from './services/feedback.service';
@NgModule({
  declarations: [
    AppComponent, //root component
    MenuComponent, DishdetailComponent, HeaderComponent, FooterComponent, HomeComponent, AboutComponent, ContactComponent, LoginComponent, HighlightDirective //child component 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  exports: [
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ],
  providers: [DishService, PromotionService,FeedbackService, LeaderService, {provide: 'BaseURL',useValue: baseURL}, ProcessHTTPMsgService],
  entryComponents:[
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

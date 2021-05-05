import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/* Modules Routing */
import { AppRoutingModule } from './app-routing.module';

/* components */
import { AppComponent } from './app.component';
import { BannerSlideComponent } from './components/banner-slide/banner-slide.component';

/* Plugins */
import { CarouselModule as CarouselModuleOwl } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    BannerSlideComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModuleOwl
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

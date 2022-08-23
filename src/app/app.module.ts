import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Meta } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { NewsComponent } from './news/news.component';
import { PostComponent } from './news/post/post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChallengeComponent } from './programs/fll/challenge/challenge.component';
import { ExploreComponent } from './programs/fll/explore/explore.component';
import { FrcComponent } from './programs/frc/frc.component';
import { FtcComponent } from './programs/ftc/ftc.component';
import { MinecraftComponent } from './programs/minecraft/minecraft.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageGalleryComponent,
    SponsorsComponent,
    ImageCarouselComponent,
    FrcComponent,
    FtcComponent,
    ExploreComponent,
    ChallengeComponent,
    MinecraftComponent,
    PageNotFoundComponent,
    NewsComponent,
    ContactUsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }

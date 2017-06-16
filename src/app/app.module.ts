import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Firebase and angularfire modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Services
import {FirebaseService} from './services/firebase.service';
import {AuthService} from './services/auth.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { AppComponent } from './app.component';
import { ListingsComponent } from './components/listings/listings.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NewsComponent } from './components/news/news.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginEmailComponent } from './components/login-email/login-email.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'listings', component: ListingsComponent, canActivate: [AuthGuard]},
  {path: 'add-listing', component: AddListingComponent},
  {path: 'listing/:id', component: ListingComponent},
  {path: 'edit-listing/:id', component: EditListingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login-email', component: LoginEmailComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'news', component: NewsComponent, canActivate: [AuthGuard]},
  {path: 'add-news', component: AddNewsComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'profile', component: ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ListingsComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    NewsComponent,
    AddNewsComponent,
    BlogComponent,
    LoginEmailComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    Ng2SearchPipeModule
  ],
  providers: [FirebaseService, AngularFireDatabase, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

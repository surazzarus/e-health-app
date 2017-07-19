import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

// 3rd party modules
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MyDatePickerModule } from 'mydatepicker';
import { StarRatingModule } from 'angular-star-rating';

// Firebase and angularfire modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Services
import {FirebaseService} from './shared/services/firebase.service';
import {AuthService} from './shared/services/auth.service';

// Guards
import { AuthGuard } from './shared/guards/auth.guard';

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
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NutritionsComponent } from './components/nutritions/nutritions.component';
import { AddNutritionComponent } from './components/add-nutrition/add-nutrition.component';
import { SurveyComponent } from './components/survey/survey.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { NutritionComponent } from './components/nutrition/nutrition.component';

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
  {path: 'blogs', component: BlogsComponent},
  {path: 'blog/:id', component: BlogComponent},
  {path: 'add-blog', component: AddBlogComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'survey', component: SurveyComponent, canActivate: [AuthGuard]},
  {path: 'nutritions', component: NutritionsComponent, canActivate: [AuthGuard]},
  {path: 'add-nutrition', component: AddNutritionComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}

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
    ProfileComponent,
    WelcomeComponent,
    NutritionsComponent,
    AddNutritionComponent,
    SurveyComponent,
    PageNotFoundComponent,
    AddBlogComponent,
    BlogsComponent,
    NutritionComponent
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
    Ng2SearchPipeModule,
    MyDatePickerModule,
    StarRatingModule.forRoot()
  ],
  providers: [FirebaseService, AngularFireDatabase, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

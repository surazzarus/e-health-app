import { Routes } from '@angular/router';

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

import {BlogsResolve} from './shared/services/blogs-resolve.service';

// Guards
import { AuthGuard } from './shared/guards/auth.guard';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'listings', component: ListingsComponent, canActivate: [AuthGuard]},
  {path: 'admin/add-listing', component: AddListingComponent},
  {path: 'listing/:id', component: ListingComponent},
  {path: 'admin/edit-listing/:id', component: EditListingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login-email', component: LoginEmailComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'news', component: NewsComponent, canActivate: [AuthGuard]},
  {path: 'admin/add-news', component: AddNewsComponent},
  {
    path: 'blogs',
    component: BlogsComponent,
    resolve: {
      blogs: BlogsResolve
    }
  },
  {path: 'blog/:id', component: BlogComponent},
  {path: 'admin/add-blog', component: AddBlogComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'survey', component: SurveyComponent, canActivate: [AuthGuard]},
  {path: 'nutritions', component: NutritionsComponent, canActivate: [AuthGuard]},
  {path: 'admin/add-nutrition', component: AddNutritionComponent},
  {path: '**', component: PageNotFoundComponent}

]

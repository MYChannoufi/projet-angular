import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdeasComponent } from './ideas/ideas.component';
import { AddIdeaComponent } from './add-idea/add-idea.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ideas', component: IdeasComponent },
  { path: 'ideas/:id', component: IdeaDetailsComponent },
  { path: 'add-idea', component: AddIdeaComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

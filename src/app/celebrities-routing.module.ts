import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CelebritiesListComponent } from './components/celebrities-list/celebrities-list.component';


const routes: Routes = [
  {
    path: '', 
    component: CelebritiesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CelebritiesRoutingModule { }

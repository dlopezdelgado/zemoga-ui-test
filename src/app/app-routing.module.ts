import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./candidates/candidates.module').then(childModule => childModule.CandidatesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

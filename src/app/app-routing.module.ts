import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./celebrities/celebrities.module').then(childModule => childModule.CelebritiesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

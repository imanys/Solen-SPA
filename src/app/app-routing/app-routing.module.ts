import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../home/home.module').then(
        mod => mod.HomeModule
      )
  },
  {
    path: 'workspace',
    loadChildren: () =>
      import('../protected-zone/workspace/workspace.module').then(
        mod => mod.WorkspaceModule
      )
  },
  {
    path: 'learn',
    loadChildren: () =>
      import('../protected-zone/course-learning/course-learning.module').then(
        mod => mod.CourseLearningModule
      )
  },
  {
    path: 'signing-up',
    loadChildren: () =>
      import('../signing-up/signing-up.module').then(
        mod => mod.SigningUpModule
      )
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../auth/auth.module').then(
        mod => mod.AuthModule
      )
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

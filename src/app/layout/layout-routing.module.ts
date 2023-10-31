import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ElementsTableComponent } from '../components/elements-table/elements-table.component';
import { FolderTreeComponent } from '../components/folder-tree/folder-tree.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'elements', pathMatch: 'full' },
      { path: 'elements', component: ElementsTableComponent },
      { path: 'folders', component: FolderTreeComponent },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementsTableComponent } from './components/elements-table/elements-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FolderTreeComponent } from './components/folder-tree/folder-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [AppComponent, ElementsTableComponent, FolderTreeComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTreeModule, MatIconModule, MatButtonModule, MatGridListModule, MatCardModule, MatMenuModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

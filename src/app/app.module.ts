import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, ActivatedRoute }  from '@angular/router';
import { AppRoutes } from './app.routing';
import {MaterializeModule} from "angular2-materialize";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



import { AppComponent } from './app.component';
import { NewprojectComponent } from './newproject/newproject.component';
import { StudydataheaderComponent } from './newproject/studydataheader/studydataheader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrialsComponent } from './newproject/trials/trials.component';
import { ReportComponent } from './newproject/report/report.component';

import { DashboardPipe } from './dashboard/dashboard.pipe';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './authguard.service';
import {AdminAuthguardService} from './admin-authguard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AnalysisComponent } from './newproject/analysis/analysis.component';
import { AdminComponent } from './admin/admin.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminmanageusersComponent } from './admin/adminmanageusers/adminmanageusers.component';
import { StudyoptionsComponent } from './admin/studyoptions/studyoptions.component';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    NewprojectComponent,
    StudydataheaderComponent,
    DashboardComponent,
    TrialsComponent,
    ReportComponent,
    DashboardPipe,
    LoginComponent,
    NotFoundComponent,
    AnalysisComponent,
    AdminComponent,
    AdmindashboardComponent,
    AdminmanageusersComponent,
    StudyoptionsComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    NgxDatatableModule,
    AppRoutes,
    DataTableModule,
    SharedModule
      ],
  exports: [RouterModule],
  providers: [AuthGuard,AdminAuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

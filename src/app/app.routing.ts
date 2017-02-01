import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {NewprojectComponent} from './newproject/newproject.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component'
import {AdminComponent} from './admin/admin.component'
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './authguard.service';
import {AdminAuthguardService} from './admin-authguard.service'


const routes: Routes = [
 
  {path: 'newproj', component: NewprojectComponent,canActivate: [AuthGuard]},
  {path: 'newproj/:id', component: NewprojectComponent,canActivate: [AuthGuard]},
    {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
    {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
        {path: 'admin', component: AdminComponent, canActivate: [AdminAuthguardService]},
    {path: 'login', component:LoginComponent},
    {path: '**', component:NotFoundComponent}
];

export const AppRoutes = RouterModule.forRoot(routes);
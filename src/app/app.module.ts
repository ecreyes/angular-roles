import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// routes
import { APP_ROUTING } from "./app.routes";

// components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { UserShowComponent } from './components/user-show/user-show.component';

const COMPONENTS = [
  SidebarComponent,
  UserModalComponent,
  UserShowComponent
];

// pages
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';

const PAGES = [
  HomeComponent,
  UserComponent
];

// services
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { WorkspaceService } from './services/workspace.service';
import { DisabledPermissionService } from './services/disabled-permission.service';

const SERVICES = [
  UserService,
  RoleService,
  WorkspaceService,
  DisabledPermissionService
];

// pipes
import { PermissionPipe } from './pipes/permission.pipe';
const PIPES = [
  PermissionPipe
];

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...PAGES,
    ...PIPES
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    ...SERVICES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

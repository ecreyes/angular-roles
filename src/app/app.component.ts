import { Component } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private ngxRoleService: NgxRolesService,
    private roleSrv: RoleService) {
    this.roleSrv.getRoleById(1).subscribe(data => {
      this.ngxRoleService.addRoleWithPermissions(data.roles[0],data.permissions);
    })
  }
}

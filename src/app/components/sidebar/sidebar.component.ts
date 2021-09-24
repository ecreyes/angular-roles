import { Component } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  public roleText$: Observable<string>;

  constructor(private ngxRoleService: NgxRolesService,
    private roleSrv: RoleService) {
      this.roleText$ = this.roleSrv.roleText$.pipe(shareReplay());
  }


  public setRoles(id: number): void {
    
    this.roleSrv.getRoleById(id).subscribe(data => {
      this.ngxRoleService.flushRolesAndPermissions();
      this.ngxRoleService.addRoleWithPermissions(data.roles[0], data.permissions);
    })
  }
}

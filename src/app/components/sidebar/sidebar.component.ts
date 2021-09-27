import { Component, OnInit } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { Observable, of } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { shareReplay, switchMap, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { BaseRole } from 'src/app/base/BaseRole.class';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent extends BaseRole implements OnInit {

  public roleText$: Observable<string>;
  public form: FormGroup;

  public workspaceList: any = [];
  public serviceList: any = [];

  constructor(
    private ngxRoleService: NgxRolesService,
    private roleSrv: RoleService,
    private workspaceSrv: WorkspaceService
  ) {
    super();
    this.form = new FormGroup({
      workspaceId: new FormControl(''),
      serviceId: new FormControl('')
    });
    this.form.get('workspaceId')?.valueChanges.pipe(
      distinctUntilChanged(),
      map(value => Number(value)),
      switchMap(value => this.workspaceSrv.getServiceByWorkspace(value))
    ).subscribe(res => {
      this.form.get('serviceId')?.setValue('');
      this.ngxRoleService.flushRolesAndPermissions();
      this.roleSrv.roleText$.next('');
      this.serviceList = res;
    });


    this.form.get('serviceId')?.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap(value => {
        if (!!value) {
          return this.roleSrv.getPermissions(this.form.get('workspaceId')?.value, value)
        }
        return of(null);
      })
    ).subscribe(data => {
      if (!!data) {
        console.log('data', data);
        this.ngxRoleService.flushRolesAndPermissions();
        this.ngxRoleService.addRoleWithPermissions(data.roles[0], data.permissions);
      }
    });
    this.roleText$ = this.roleSrv.roleText$.pipe(shareReplay());
  }

  public ngOnInit(): void {
    this.initSetup();
  }

  private initSetup(): void {
    this.workspaceSrv.getWorkspaceList().pipe(
      tap(workspaceList => {
        this.workspaceList = workspaceList;
        this.form.get('workspaceId')?.setValue(this.workspaceList[2].workspaceId)
      }),
      switchMap(()=>{
        return this.workspaceSrv.getServiceByWorkspace(this.workspaceList[2].workspaceId)
      })
    ).subscribe((serviceList)=>{
      this.serviceList = serviceList;
      this.form.get('serviceId')?.setValue(serviceList[0].id);
    })
  }


}

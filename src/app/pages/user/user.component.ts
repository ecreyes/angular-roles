import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../types/user.type';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserModalMode } from 'src/app/components/user-modal/user-modal.types';

import { BaseRole } from 'src/app/base/BaseRole.class';
import { DisabledPermissionService, DisabledType, DisabledOptionType, DisableTypeEnum } from 'src/app/services/disabled-permission.service';
import { PermissionPipe } from 'src/app/pipes/permission.pipe';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [PermissionPipe]
})
export class UserComponent extends BaseRole {
  public users$: Observable<User[]>;
  public isLoading = false;

  public mode: UserModalMode = 'create';
  public data: User | any = null;

  public loadingDemo = false;

  public userSelected: User = {
    id: 1,
    name: '',
    email: '',
    desc: ''
  };

  constructor(
    private userSrv: UserService,
    private disabledPermissionService: DisabledPermissionService,
    private permissionPipe: PermissionPipe,
  ) {
    super();
    this.users$ = this.userSrv.getUserList$().pipe(shareReplay());
  }

  public deleteUser(id: number): void {
    this.isLoading = true;
    setTimeout(() => {
      this.userSrv.deleteUserById(id);
      this.isLoading = false;
    }, 1000);
  }

  public createUser(): void {
    this.mode = 'create';
    this.data = null;
  }

  public editUser(id: number): void {
    this.mode = 'edit';
    this.data = this.userSrv.getUserById(id);
  }

  public actionModal(action: any): void {
    if (action.mode === 'edit') {
      this.userSrv.editUser(action.data);
    }
    if (action.mode === 'create') {
      this.userSrv.createUser(action.data);
    }
  }

  public showUser(user: User): void {
    this.userSelected = user;
  }

  public enabled$(permList: string[], type: DisabledType, option: DisabledOptionType): Observable<boolean> {
    return this.disabledPermissionService.enabled$(permList, type, option);
  }

  public getDisabled(): Observable<boolean> {
    return this.permissionPipe.transform(['ADMIN'], DisableTypeEnum.PERM).pipe(
      map(res => res && !this.loadingDemo)
    );
  }


}

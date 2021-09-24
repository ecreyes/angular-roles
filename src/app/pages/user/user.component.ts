import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../types/user.type';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserModalMode } from 'src/app/components/user-modal/user-modal.types';

import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  public users$: Observable<User[]>;
  public isLoading = false;

  public mode: UserModalMode = 'create';
  public data: User | any = null;

  public userSelected: User = {
    id: 1,
    name: '',
    email: '',
    desc: ''
  };

  constructor(
    private userSrv: UserService) {
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


}

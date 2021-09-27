import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleEnum } from '../enum/RoleEnum';


@Injectable({
    providedIn: 'root'
})
export class RoleService {
    public roleText$ = new BehaviorSubject('');

    constructor(private http: HttpClient) { }

    public getPermissions(workspaceId: number, serviceId: number): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/posts/2').pipe(
            map(() => {
                return this.getRoleByWorkspace(Number(workspaceId), Number(serviceId));
            })
        );
    }

    private getRoleByWorkspace(workspaceId: number, serviceId: number): any {
        if (workspaceId === 1) {
            if (serviceId === 101) {
                this.roleText$.next(RoleEnum.ADMIN);
                return {
                    roles: [
                        RoleEnum.ADMIN
                    ],
                    permissions: [
                        'read_users',
                        'create_users',
                        'update_users',
                        'delete_users'
                    ]
                }
            }
            if (serviceId === 102) {
                this.roleText$.next(RoleEnum.ADMIN);
                return {
                    roles: [
                        RoleEnum.ADMIN
                    ],
                    permissions: [
                        'delete_users'
                    ]
                }
            }
        }
        if (workspaceId === 2) {
            this.roleText$.next(RoleEnum.USER);
            if (serviceId === 103) {
                return {
                    roles: [
                        RoleEnum.USER
                    ],
                    permissions: [
                        'read_users'
                    ]
                }
            }
        }
        if (workspaceId === 3) {
            this.roleText$.next(RoleEnum.GUEST);
            if (serviceId === 104) {
                return {
                    roles: [
                        RoleEnum.GUEST
                    ],
                    permissions: [
                    ]
                }
            }
        }
    }

}
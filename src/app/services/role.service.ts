import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class RoleService {
    public roleText$ = new BehaviorSubject('');

    constructor(private http: HttpClient) { }

    public getRoleById(id: number): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/posts/1').pipe(
            map(() => {
                return this.getFakeData(id);
            })
        );
    }

    private getFakeData(option: number): any {
        if (option === 1) {
            this.roleText$.next('ADMIN');
            return {
                roles: [
                    'ADMIN'
                ],
                permissions: [
                    'read_users',
                    'create_users',
                    'update_users',
                    'delete_users'
                ]
            }
        }
        if (option === 2) {
            this.roleText$.next('USER');
            return {
                roles: [
                    'USER'
                ],
                permissions: [
                    'read_users',
                ]
            }
        }
        if (option === 3) {
            this.roleText$.next('GUEST');
            return {
                roles: [
                    'GUEST'
                ],
                permissions: []
            }
        }

    }

}
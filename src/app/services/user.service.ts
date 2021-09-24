import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/user.type';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersDB: User[] = [
        {
            id: 1,
            name: 'Eduardo',
            email: 'eduardo.reyes@haulmer.com',
            desc: 'frontend dev'
        },
        {
            id: 2,
            name: 'Obriel',
            email: 'obriel.muga@haulmer.com',
            desc: 'backend dev'
        },
        {
            id: 3,
            name: 'Yerald',
            email: 'yerald.silva@haulmer.com',
            desc: 'backend dev'
        }
    ];
    private userList$ = new BehaviorSubject<User[]>([]);


    constructor() {
        this.initialUsers();
        console.log('[users]: users loaded correctly');
    }


    public getUserList$(): Observable<User[]> {
        return this.userList$.asObservable();
    }


    private initialUsers(): void {
        this.userList$.next(this.usersDB);
    }


    public deleteUserById(id: number): void {
        this.usersDB = this.usersDB.filter(user => user.id !== id);
        this.userList$.next(this.usersDB);
    }

    public createUser(user: User): void {
        this.usersDB = [...this.usersDB, user];
        this.userList$.next(this.usersDB);
    }

    public editUser(user: User): void {
        this.usersDB = this.usersDB.map(userDB => {
            if (userDB.id === user.id) {
                return user;
            } else {
                return userDB;
            }
        });
        this.userList$.next(this.usersDB);
    }

    public getUserById(id: number): User {
        return this.usersDB.find(user => user.id === id) as User;
    }
}
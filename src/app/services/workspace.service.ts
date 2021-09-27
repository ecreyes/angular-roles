import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {
    constructor(private http: HttpClient) {
        //
    }

    public getWorkspaceList(): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/posts/1').pipe(
            map(() => {
                return [
                    {
                        workspaceId: 1,
                        workspaceName: 'Boxhosting',
                    },
                    {
                        workspaceId: 2,
                        workspaceName: 'Edu space',
                    },
                    {
                        workspaceId: 3,
                        workspaceName: 'Invitado',
                    }
                ]
            })
        )
    }

    public getServiceByWorkspace(workspaceId: number): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/posts/3').pipe(
            map(() => {
                if (workspaceId === 1) {
                    return [
                        {
                            id: 101,
                            serviceName: 'Servicio de usuarios 101'
                        },
                        {
                            id: 102,
                            serviceName: 'Servicio de usuarios 102'
                        }
                    ]
                }
                if (workspaceId === 2) {
                    return [
                        {
                            id: 103,
                            serviceName: 'Servicio de usuarios 103'
                        }
                    ]
                }
                if (workspaceId === 3) {
                    return [
                        {
                            id: 104,
                            serviceName: 'Servicio de invitados 104'
                        }
                    ]
                }
                return [];
            })
        )
    }

}
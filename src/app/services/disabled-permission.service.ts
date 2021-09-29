import { Injectable } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export type DisabledType = DisableTypeEnum.ROLE | DisableTypeEnum.PERM;
export type DisabledOptionType = DisableOption.AND | DisableOption.OR | DisableOption.EXCEPT;

export enum DisableOption {
    AND = 'AND',
    OR = 'OR',
    EXCEPT = 'EXCEPT'
}

export enum DisableTypeEnum {
    ROLE = 'ROLE',
    PERM = 'PERM'
}

@Injectable({
    providedIn: 'root'
})
export class DisabledPermissionService {

    constructor(
        private permissionsService: NgxPermissionsService,
        private roleService: NgxRolesService,
    ) {
        //
    }

    public enabled$(list: string[], type: DisabledType, option: DisabledOptionType): Observable<boolean> {
        if (option === DisableOption.AND) {
            return this.getService(type).pipe(
                map(data => {
                    let disabled = false;
                    list.forEach(perm => {
                        if (!data[perm]) {
                            disabled = true;
                            return;
                        }
                    });
                    return disabled;
                })
            );
        }
        if (option === DisableOption.OR) {
            return this.getService(type).pipe(
                map(data => {
                    let disabled = false;
                    if (!list.find(perm => data[perm])) {
                        disabled = true;
                    }
                    return disabled;
                })
            );
        }
        if (option === DisableOption.EXCEPT) {
            return this.getService(type).pipe(
                map(data => {
                    let disabled = false;
                    list.forEach(perm => {
                        if (data[perm]) {
                            disabled = true;
                            return;
                        }
                    });
                    return disabled;
                })
            );
        }
        return of(false);
    }

    private getService(type: DisabledType): Observable<any> {
        if (type === DisableTypeEnum.ROLE) {
            return this.roleService.roles$.pipe(shareReplay());
        }
        if (type === DisableTypeEnum.PERM) {
            return this.permissionsService.permissions$.pipe(shareReplay());
        }
        return of(null);
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { DisabledPermissionService, DisabledType, DisabledOptionType, DisableTypeEnum, DisableOption } from '../services/disabled-permission.service';

@Pipe({ name: 'permission' })
export class PermissionPipe implements PipeTransform {

    constructor(private disabledPermissionSrv: DisabledPermissionService) {
        //
    }

    transform(permissions: string[], type: DisabledType = DisableTypeEnum.PERM, option: DisabledOptionType = DisableOption.AND): Observable<boolean> {
        return this.disabledPermissionSrv.enabled$(permissions, type, option);
    }
}
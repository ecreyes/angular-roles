import { Component, Input } from '@angular/core';
import { BaseRole } from 'src/app/base/BaseRole.class';
import { User } from 'src/app/types/user.type';

@Component({
    selector: 'app-user-show',
    templateUrl: './user-show.component.html',
})
export class UserShowComponent extends BaseRole {
    @Input() public user: User | any;

    constructor(){
        super();
    }
}

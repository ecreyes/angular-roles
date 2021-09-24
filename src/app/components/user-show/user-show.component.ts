import { Component, Input } from '@angular/core';
import { User } from 'src/app/types/user.type';

@Component({
    selector: 'app-user-show',
    templateUrl: './user-show.component.html',
})
export class UserShowComponent {
    @Input() public user: User | any;
}

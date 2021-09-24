import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/types/user.type';
import { UserModalMode } from './user-modal.types';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html'
})
export class UserModalComponent implements OnChanges {
    @Input() public data: User | any;
    @Input() public mode: UserModalMode = 'create';

    public form: FormGroup;
    @Output('sendEvent') public sendEvent: any = new EventEmitter();

    constructor() {
        this.form = new FormGroup({
            id: new FormControl(''),
            name: new FormControl(''),
            email: new FormControl(''),
            desc: new FormControl('')
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.data) {
            if (!!this.data) {
                this.form.setValue({
                    id: this.data.id,
                    name: this.data.name,
                    email: this.data.email,
                    desc: this.data.desc
                });
            } else {
                this.form.reset();
            }
        }
    }

    public submit(): void {
        this.sendEvent.emit({ data: this.form.value, mode: this.mode });
    }


    public getModeText(): any {
        return this.mode == 'create' ? 'Crear' : 'Editar';
    }
}

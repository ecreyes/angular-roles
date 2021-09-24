import { RoleEnum } from "../enum/RoleEnum";

export abstract class BaseRole {

    public get ROLES(): typeof RoleEnum {
        return RoleEnum;
    }
}
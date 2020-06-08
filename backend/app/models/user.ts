import { mongoose } from '../utils/database';
import { Property, getModelFromClass } from '../lib/decorators/model';
import bycrypt from 'bcrypt';
import { IActivatable } from '../lib/interfaces/IActivatable';
import Role from './Role';

// Application Model
export class UserModel extends mongoose.Document implements IActivatable {

    @Property({ default: true })
    _active!: boolean;

    @Property({ required: true })
    name!: string;

    @Property({ required: true })
    email!: string;

    @Property({ required: true })
    password!: string;

    @Property({ items: Role })
    roles!: typeof Role[];

    comparePassword(candidatePassword: string): boolean {
        return this.password ? bycrypt.compareSync(candidatePassword, this.password) : false;
    }

    getPublicInformation() {
        return {
            name: this.name,
            roles: this.roles,
            email: this.email,
            _active: this._active
        };
    }
};
const User = getModelFromClass<UserModel>(UserModel);

export default User;
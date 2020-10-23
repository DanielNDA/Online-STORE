import {Role} from '../../roles/model/role';

export class Privilege {
  id: number;
  name: string;
  roleList: Role[];
}

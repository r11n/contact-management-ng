import { Contact } from './contact';

export class Group {
    id: number;
    name: string;
    user_id: number;
    is_favorite: boolean;
    status: boolean;
    contacts: Array<Contact>;
    constructor() {  }
}

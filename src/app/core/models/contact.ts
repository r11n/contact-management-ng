import { ContactEmail } from './contact_email';
import { ContactNumber } from './contact_number';
import { ContactAddress } from './contact_address';

export class Contact {
    id: number;
    name: number;
    group_id: number;
    user_id: number;
    is_favorite: boolean;
    contact_emails: Array<ContactEmail>;
    contact_numbers: Array<ContactNumber>;
    contact_addresses: Array<ContactAddress>;
    constructor() {  }
}

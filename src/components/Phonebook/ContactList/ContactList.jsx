import React from 'react';
import {ContactItem} from '../ContactItem/ContactItem';

export const ContactList = ({contacts, onClick}) => {
    return <ul>
        <ContactItem items={contacts} onClick={onClick} />
    </ul>
}
import React from 'react';
import css from '../ContactItem/ContactItem.module.css'

export const ContactItem = ({items, onClick}) => {
    return <>
        {items.map(({ id, name, number }) =>
            <li key={id} className={css.contactItem}>
                <p className={css.contactText}>{name}: {number}</p>
                <button type='button' className={css.contactBtn} onClick={() => onClick(id)}>Delete</button>
            </li>)}
        </>
}
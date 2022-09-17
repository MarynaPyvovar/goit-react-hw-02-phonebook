import React from 'react';

export const ContactItem = ({items, onClick}) => {
    return <>
        {items.map(({ id, name, number }) =>
            <li key={id}>
                <p>{name}: {number}</p>
                <button type='button' onClick={() => onClick(id)}>Delete</button>
            </li>)}
        </>
}
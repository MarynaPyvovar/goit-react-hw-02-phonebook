import React, { Component } from 'react';
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';

export default class ContactList extends Component {
    state = {
        contacts: [
    {id: nanoid(), name: 'Rosie Simpson', number: '459-12-56'},
    {id: nanoid(), name: 'Hermione Kline', number: '443-89-12'},
    {id: nanoid(), name: 'Eden Clements', number: '645-17-79'},
    {id: nanoid(), name: 'Annie Copeland', number: '227-91-26'},
        ],
        name: '',
        number: '',
    }
    
    render() {
        return <ul>
            {this.state.contacts.map(({id, name, number}) => {
                return <li key={id}>{name}: {number}
                    <button type='button'>Delete</button>
                </li>
            })}
        </ul>
    }
}

ContactList.propTypes = {
    state: PropTypes.objectOf(PropTypes.shape({
        contacts: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }))
    }))
}
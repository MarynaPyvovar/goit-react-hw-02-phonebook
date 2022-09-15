import React, { Component } from 'react';
// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactList/ContactList';
// import { Filter } from './Filter/Filter';

import { nanoid } from 'nanoid';
import PropTypes from "prop-types";

export default class Phonebook extends Component {
    state = {
        contacts: [
    {id: nanoid(), name: 'Rosie Simpson', number: '459-12-56'},
    {id: nanoid(), name: 'Hermione Kline', number: '443-89-12'},
    {id: nanoid(), name: 'Eden Clements', number: '645-17-79'},
    {id: nanoid(), name: 'Annie Copeland', number: '227-91-26'},
        ],
        name: '',
        number: '',
        filter: '',
    }

    handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
        [name]: value,
    })
    }
    
    getFilteredContacts() {
        const { contacts, filter } = this.state;
    
        if (!filter) {
            return contacts;
        }

        const normalizedFilter = filter.toLocaleLowerCase();
        
        const filteredContacts = contacts.filter(({name}) => {
            const normalizedName = name.toLocaleLowerCase();
            const result = normalizedName.includes(normalizedFilter);
        return result;
    })

    return filteredContacts;
    }

    render() {
        const { contacts, name, number, filter } = this.state;
        const filteredContacts = this.getFilteredContacts();
    return <div>
        <h1>Phonebook</h1>
        {/* <ContactForm onChange={this.handleChange} /> */}
        <form>
            <label>Name
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required />
            </label>
            <label>Number
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
/>
            </label>
            <button type='submit'>Add contact</button>
        </form>

        <h2>Contacts</h2>
        {/* <Filter onChange={this.handleChange} value={filter} /> */}
        <label>Find contacts by name
            <input type="text"  name="filter" value={filter} onChange={this.handleChange}/>
        </label>
        {/* <ContactList /> */}
        <ul>
            {filteredContacts.map(({id, name, number}) => {
                return <li key={id}>{name}: {number}
                    <button type='button'>Delete</button>
                </li>
            })}
        </ul>
    </div>
    }
}

Phonebook.propTypes = {
    state: PropTypes.objectOf(PropTypes.shape({
        contacts: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })),
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        filter: PropTypes.string.isRequired,
    }))
}
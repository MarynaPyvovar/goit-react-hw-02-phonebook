import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './Phonebook.module.css'

import PropTypes from "prop-types";
import { nanoid } from 'nanoid';

export default class Phonebook extends Component {
    state = {
        contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
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
        
        return contacts.filter(({name}) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    }

    removeContact = (contactId) => {
        this.setState(prev => {
            return { contacts: prev.contacts.filter(item => item.id !== contactId) }
        })
    }

    addContact = (name, number) => {
        if (this.contactAlreadyExists(name, number)) {
        return alert(`${name} ${number} is already in Phonebook`);
        }

        this.setState(prev => {
            const newContact = { id: nanoid(), name, number };

            return {
                contacts: [newContact, ...prev.contacts]
            }
        })
    }

    contactAlreadyExists = (name, number) => {
    return this.state.contacts.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() || item.number === number);
    }

    render() {
        const { contacts, filter } = this.state;
        const filteredContacts = this.getFilteredContacts();
    return <>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={this.handleChange} />
        <ContactList contacts={filteredContacts} onClick={this.removeContact} />
    </>
    }
}

Phonebook.propTypes = {
    state: PropTypes.objectOf(PropTypes.shape({
        contacts: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })),
        filter: PropTypes.string.isRequired,
    }))
}
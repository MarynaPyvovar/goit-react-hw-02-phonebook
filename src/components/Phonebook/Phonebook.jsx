import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import PropTypes from "prop-types";
import { nanoid } from 'nanoid';

export default class Phonebook extends Component {
    state = {
        contacts: [],
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
        this.setState(prev => {
            const newContact = { id: nanoid(), name, number };

            return {
                contacts: [newContact, ...prev.contacts]
            }
        })
    }

    render() {
        const { contacts, filter } = this.state;
        const filteredContacts = this.getFilteredContacts();
    return <>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} addContact={this.addContact} />

        <h2>Contacts</h2>
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
import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './Phonebook.module.css'

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
        const { filter } = this.state;
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
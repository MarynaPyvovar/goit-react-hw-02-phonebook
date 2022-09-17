import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from "prop-types";

export default class ContactForm extends Component {
    state = {
        contacts: [],
        name: '',
        number: '',
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, number } = this.state;
        
        if (this.contactAlreadyExists(name, number)) {
        return alert(`${name} ${number} is already in Phonebook`);
        }

        this.setState(prev => {
            const { name, number, contacts } = prev;
            const newContact = { id: nanoid(), name, number };

            return {
                contacts: [newContact, ...contacts],
                name: '',
                number: ''
            }
        })
    }

    contactAlreadyExists(name, number) {
    return this.state.contacts.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() || item.number === number);
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <label>Name
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required />
            </label>
            <label>Number
                <input
                    type="tel"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
/>
            </label>
            <button type='submit'>Add contact</button>
        </form>
    }
}

ContactForm.propTypes = {
    state: PropTypes.objectOf(PropTypes.shape({
        // contacts: PropTypes.arrayOf(PropTypes.shape({
        //     id: PropTypes.string.isRequired,
        //     name: PropTypes.string.isRequired,
        //     number: PropTypes.string.isRequired,
        // })),
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }))
}
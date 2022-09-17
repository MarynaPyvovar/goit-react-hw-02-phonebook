import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class ContactForm extends Component {
    state = {
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

        this.setState(() => {
            this.props.addContact(name, number)

            return {
                name: '',
                number: ''
            }
        })
    }

    contactAlreadyExists(name, number) {
    return this.props.contacts.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() || item.number === number);
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
                    required />
            </label>
            <button type='submit'>Add contact</button>
        </form>
    }
}

ContactForm.propTypes = {
    state: PropTypes.objectOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }))
}
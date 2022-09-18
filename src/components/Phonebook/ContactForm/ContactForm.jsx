import React, { Component } from 'react';
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';
import css from '../ContactForm/ContactForm.module.css'

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

        this.setState(() => {
            this.props.addContact(name, number)
            console.log(name)

            return {
                name: '',
                number: ''
            }
        })
    }

    render() {
        const nameId = nanoid();
        const numberId = nanoid();
        return <form onSubmit={this.handleSubmit} className={css.insertWrapper}>
            <label className={css.label} htmlFor={nameId}>Name</label>
            <input
                id={nameId}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                placeholder='Input name'
                className={css.input} />
            <label className={css.label} htmlFor={numberId}>Number</label>
            <input
                id={numberId}
                type="tel"
                name="number"
                value={this.state.number}
                onChange={this.handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                placeholder='Input number'
                className={css.input} />
            <button type='submit' className={css.button}>Add contact</button>
        </form>
    }
}

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
}
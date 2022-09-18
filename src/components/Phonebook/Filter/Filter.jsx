import React from 'react';
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';
import css from '../Filter/Filter.module.css'

export const Filter = ({ value, onChange }) => {
  const filterId = nanoid();
  return (<div className={css.filterWrapper}>
    <label htmlFor={filterId} className={css.label}>Find contacts by name</label>
    <input id={filterId} type="text" name="filter" value={value} onChange={onChange} className={css.input} placeholder='Input name'/>
  </div>);
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
import React from 'react';

export const Filter = ({handleChange}, {filter}) => {
  return (
    <label>Find contacts by name
        <input type="text"  name="filter" value={filter} onChange={handleChange}/>
    </label>
  );
};
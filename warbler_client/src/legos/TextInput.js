import React from 'react';
import PropTypes from 'prop-types';
const TextInput = ({inputName, handleChange, value}) => {
	return(
		<React.Fragment>
			<label htmlFor={inputName}>{inputName}:</label>
			<input 
				type="text"
				id={inputName}
				name={inputName}
				className='form-control'
				onChange={handleChange}
				value={value}
			/>
		</React.Fragment>
	)
}

export default TextInput;

TextInput.propTypes = {
	inputName: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};


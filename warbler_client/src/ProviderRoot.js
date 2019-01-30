import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store'; 

// Create a root component that gives store access to all its children.
// This is helpful for writing integration tests

const store = configureStore();

const ProviderRoot = ({children}) => {
	return(
		<Provider store={store}>
			{children}
		</Provider>
	)
};

export default ProviderRoot;
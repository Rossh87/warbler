// Import packages
import React from 'react';
import ReactDOM from 'react-dom';

// Import styles
import './index.css';

// Import local components
import ProviderRoot from './ProviderRoot';
import App from './containers/App';

// Service worker
import registerServiceWorker from './registerServiceWorker';

// Render App wrapped by Provider component
ReactDOM.render(
	<ProviderRoot>
		<App />
	</ProviderRoot>
	, document.querySelector('#root')
);

registerServiceWorker();

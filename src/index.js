import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import selectStore from './store/config/selectStore';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { rrfProps } from './store/config/fbConfig';

import './index.css';
import 'materialize-css/dist/css/materialize.min.css';
import AuthIsLoaded from './components/auth/AuthIsLoaded';

const store = selectStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps(store)}>
				<AuthIsLoaded>
					<App />
				</AuthIsLoaded>
			</ReactReduxFirebaseProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.register();

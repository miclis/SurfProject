import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/auth/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Start from './components/start/Start';
import Main from './components/main/Main';

function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Switch>
					<Route exact path='/' component={Start} />
					<PrivateRoute path='/app' component={Main} />
				</Switch>
				<ToastContainer autoClose={3000} position='top-center' />
			</div>
		</BrowserRouter>
	);
}

export default App;

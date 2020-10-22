import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/auth.actions';
import './Main.css';
import user from '../../svg/user.svg';
import logo from '../../svg/logo_white.svg';

function Header(props) {
	const { photoURL } = props.auth;

	return (
		<nav className='header nav-wrapper cyan darken-2'>
			<div className='container'>
				<Link to='/' className='brand-logo left'>
					<img src={logo} alt='logo' className='logo' />
					SurfProject
				</Link>
				<ul className='right'>
					<li>
						<NavLink to='/app' exact activeClassName='active'>
							My Lessons
						</NavLink>
					</li>
					<li>
						<a href='/' onClick={props.logout}>
							Log Out
						</a>
					</li>
					<li>
						<NavLink to='/app/profile' activeClassName='active' className='profileLink'>
							<img src={photoURL ? photoURL : user} alt='Profile' className='profilePhoto' />
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = {
	logout: authActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

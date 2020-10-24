/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth.actions';
import './Main.css';
import user from '../../svg/user.svg';
import logo from '../../svg/logo_white.svg';
import M from 'materialize-css/dist/js/materialize';
import { isLoaded, isEmpty } from 'react-redux-firebase';

function Header(props) {
	const { photoURL } = props.auth;

	const token = useSelector((state) => state.firebase.profile.token);

	useEffect(() => {
		let sidenav = document.querySelector('#slide-out');
		M.Sidenav.init(sidenav, {});
	}, []);

	// Token not loaded
	if (!isLoaded(token) || isEmpty(token))
		return (
			<>
				<nav className='header nav-wrapper cyan darken-2'>
					<div className='container'>
						<Link to='/' className='brand-logo left'>
							<img src={logo} alt='logo' className='logo' />
							SurfProject
						</Link>
						<ul className='right'>
							<li>
								<a href='#' data-target='slide-out' className='sidenav-trigger'>
									<i className='material-icons'>menu</i>
								</a>
							</li>
							<li>
								<NavLink to='/app/profile' activeClassName='active' className='profileLink'>
									<img src={photoURL ? photoURL : user} alt='Profile' className='profilePhoto' />
								</NavLink>
							</li>
						</ul>

						<ul className='right hide-on-med-and-down'>
							<li>
								<a href='/' onClick={props.logout}>
									Log Out
								</a>
							</li>
						</ul>
					</div>
				</nav>
				<ul className='sidenav' id='slide-out'>
					<li>
						<a href='/' onClick={props.logout}>
							Log Out
						</a>
					</li>
				</ul>
			</>
		);

	// Trainer
	if (token.claims.trainer)
		return (
			<header>
				<nav className='header nav-wrapper cyan darken-2'>
					<div className='container'>
						<Link to='/' className='brand-logo left'>
							<img width='32px' height='32px' src={logo} alt='logo' className='logo' />
							SurfProject
						</Link>
						<ul className='right'>
							<li>
								<a href='#!' data-target='slide-out' className='sidenav-trigger'>
									<i className='material-icons'>menu</i>
								</a>
							</li>
							<li>
								<NavLink to='/app/profile' activeClassName='active' className='profileLink'>
									<img src={photoURL ? photoURL : user} alt='Profile' className='profilePhoto' />
								</NavLink>
							</li>
						</ul>

						<ul className='right hide-on-med-and-down'>
							<li>
								<NavLink to='/app/add' exact activeClassName='active'>
									Add Lesson
								</NavLink>
							</li>
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
						</ul>
					</div>
				</nav>
				<ul className='sidenav' id='slide-out'>
					<li>
						<NavLink to='/app/add' exact activeClassName='active'>
							Add Lesson
						</NavLink>
					</li>
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
				</ul>
			</header>
		);

	// Student
	return (
		<>
			<nav className='header nav-wrapper cyan darken-2'>
				<div className='container'>
					<Link to='/' className='brand-logo left'>
						<img src={logo} alt='logo' className='logo' />
						SurfProject
					</Link>
					<ul className='right'>
						<li>
							<a href='#' data-target='slide-out' className='sidenav-trigger'>
								<i className='material-icons'>menu</i>
							</a>
						</li>
						<li>
							<NavLink to='/app/profile' activeClassName='active' className='profileLink'>
								<img src={photoURL ? photoURL : user} alt='Profile' className='profilePhoto' />
							</NavLink>
						</li>
					</ul>

					<ul className='right hide-on-med-and-down'>
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
					</ul>
				</div>
			</nav>
			<ul className='sidenav' id='slide-out'>
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
			</ul>
		</>
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

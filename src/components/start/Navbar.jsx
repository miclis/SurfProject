import React from 'react';
import './Navbar.css';
import logo from '../../svg/logo_white.svg';

function Navbar() {
	return (
		<header>
			<nav className='transparent z-depth-0'>
				<div className='nav-wrapper'>
					<div className='container'>
						<a href='#!' className='brand-logo left'>
							<img width='32px' height='32px' src={logo} alt='logo' className='logo' />
							SurfProject
						</a>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;

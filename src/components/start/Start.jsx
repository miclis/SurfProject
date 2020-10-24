import React, { useState } from 'react';
import Navbar from './Navbar';
import LoginModal from './../auth/LoginModal';
import './Start.css';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

Modal.setAppElement('#root');

Start.propTypes = {};

function Start(props) {
	const [isOpen, setIsOpen] = useState(false);

	const auth = useSelector((state) => state.firebase.auth);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	if (auth.uid) return <Redirect to='/app' />;
	return (
		<>
			<div className='startPage'>
				<Navbar toggleModal={toggleModal} />
				<main>
					<Modal
						isOpen={isOpen}
						onRequestClose={toggleModal}
						contentLabel='Login Modal'
						className='loginModal'
						overlayClassName='loginModalOverlay'
					>
						<LoginModal toggleModal={toggleModal} />
					</Modal>
					<div className='startWrapper white-text'>
						<div>Eat Surf Sleep Repeat</div>
						<button
							onClick={toggleModal}
							style={{ zIndex: 0 }}
							className='btn btn-large waves-effect waves-light login'
						>
							Login
						</button>
					</div>
				</main>
			</div>
		</>
	);
}

export default Start;

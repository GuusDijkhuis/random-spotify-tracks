import React from 'react';

import classes from './Nav.module.css';


const Nav = (props) => {
	
	const handleClick = () => {
		console.log('login');
	}
	return (
		<nav>
			<ul>
				<li>
					<button onClick={handleClick}>Login</button>
				</li>
			</ul>
		</nav>
		
	)
}

export default Nav;
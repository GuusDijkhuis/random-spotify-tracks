import React, { useEffect, useState } from 'react';
import axios from 'axios'
import classes from './Filter.module.css';
import { Credentials } from './Credentials';


const Filter = () => {
	const spotify = Credentials();
	const [categories, setCategories] = useState([]);
	const [currCategorie, setCurrCategorie] = useState('');

	useEffect(() => {
		axios('https://accounts.spotify.com/api/token', {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + btoa(`${spotify.ClientId}:${spotify.ClientSecret}`) 
			},
			data: 'grant_type=client_credentials',
			method: 'POST'
		})
		.then(tokenResponse => {
			axios(`https://api.spotify.com/v1/browse/categories`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${tokenResponse.data.access_token}`
				}
			})
			.then(res => {
				setCategories(res.data.categories.items);
			})
		})
	}, [currCategorie])

	return (
		<div>
			<ul>
				<li>
					<select 
						onChange={(e) => setCurrCategorie(e.target.value)} 
						className={classes.Dropdown}
					>
						{categories.map(res => (
							<option value={res.id}>{res.name}</option>
						))}
					</select>
				</li>
			</ul>
		</div>
		
	)
}

export default Filter;
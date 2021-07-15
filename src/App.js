import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Credentials } from './Credentials';

import { getRandomSearch, randomNumber } from './helpers';

import List from './List';
import classes from './App.module.css';
import './globals.css';

const App = () => {
	const spotify = Credentials();
	const [randomTracks, setRandomTracks] = useState([]);
	
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
			const baseUrl = 'https://api.spotify.com/v1/search';
			const type = 'track';
			const query = getRandomSearch();
			const offset = randomNumber(1, 1000);
			axios(`${baseUrl}?q=${query}&type=${type}&offset=${offset}&limit=50`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${tokenResponse.data.access_token}`
				}
			})
			.then(res => {
				setRandomTracks(res.data.tracks)
			})
		})
	}, [])
	return (
		<div className={classes.body}>
			<h1>Random Spotify Tracks</h1>
			<List data={randomTracks} />
		</div>
	);
}

export default App;
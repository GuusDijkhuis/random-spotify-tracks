import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Credentials } from './Credentials';

import classes from './Card.module.css';

const Card = (props) => {
	const spotify = Credentials();
	const artists = props.data.artist.map(artist => { return artist.name });
	const [spotifyUrl, setSpotifyUrl] = useState('');

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
			axios(`https://api.spotify.com/v1/tracks/${props.data.id}`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${tokenResponse.data.access_token}`
				}
			})
			.then(res => {
				setSpotifyUrl(res.data.external_urls.spotify)
			})
		})
	}, [])

	return (
		<a href={spotifyUrl} className={classes.Card} target="_blank" rel="noreferrer" >
			<img alt={props.data.title} src={props.data.imgUrl} />
			<div className={classes.overlay}>
				<h2>{props.data.title}</h2>
				{artists.map((res, i) => (
					<span key={i}>{res}</span>
				))}
			</div>
		</a>
	)
}

export default Card;
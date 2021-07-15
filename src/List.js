import React from 'react';

import classes from './List.module.css';
import Card from './Card';


const List = (props) => {
	return (
		<div>
			{props.data.items ? (
				<ul className={classes.List}>
					{props.data.items.map(item => (
						<Card 
							data={{
								imgUrl: item.album.images[1].url,
								title: item.name,
								id: item.id,
								artist: item.artists
							}} 
							key={item.name}
						/>
					))}
				</ul>
			) : '' }
		</div>
	)
}

export default List;


import React, { useState } from 'react';

const Dropdown = (props) => {
	const [ getValue, setValue] = useState('');

	return (
		<div>
			<select value={getValue} onChange={e => setValue(e.target.value)}>
				{props.options.map((item, i) => <option key={i} value={item.value}>{item.option}</option>)}
			</select>
			<p>{getValue}</p>
		</div>
	)
}

export default Dropdown;
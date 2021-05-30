import React from 'react'
import preloader from '../../assets/preloader/preloader.gif'


export const Preloader = () => {
	return (
		<div className='preloader'>
			<img src={preloader} alt="We are loading" />
		</div>
	)
}
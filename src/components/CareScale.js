import { useState } from 'react'
import Sun from '../assets/sun.svg'
import Water from '../assets/water.svg'
import '../styles/CareScale.css'

const quantityLabel = {
	1: 'a little bit of',
	2: 'moderately',
	3: 'a lot of'
}

function CareScale({ scaleValue, careType }) {
	const [isHovered, setIsHovered] = useState(false);

	const range = [1, 2, 3]
	const scaleType =
		careType === 'light' ? (
			<img src={Sun} alt='sun-icon' />
		) : (
			<img src={Water} alt='water-icon' />
		)

	const tooltipContent = `This plant needs ${quantityLabel[scaleValue]} ${careType === 'light' ? 'light' : "watering"
		}`

	const handleOnMouseLeave = () => {
		setIsHovered(false);
	};
	const handleOnMouseEnter = () => {
		setIsHovered(true);
		setTimeout(() => setIsHovered(false), 1500)
	};

	return (
		<div className='quantity' onMouseOver={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
			{range.map((rangeElem) =>
				scaleValue >= rangeElem ? (
					<span key={rangeElem.toString() + careType} className='spann'  >{scaleType} </span>
				) : null
			)}
			{isHovered ? <div className='carescale-details-message'>{tooltipContent}</div> : null}
		</div>
	)
}

export default CareScale
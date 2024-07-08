import { useState, useEffect } from 'react'
import PlantItem from './PlantItem'
import Categories from './Categories'
import '../styles/ShoppingList.css'
import Loader from './Loader'
import api from '../functions/API_Calls/apiCalls'
import process from "process";
import { CiSearch } from "react-icons/ci";

function ShoppingList() {
	const [activeCategory, setActiveCategory] = useState('')
	const [plantList, setPlantList] = useState([]);
	const [fiteredPlantList, setFilteredPlantList] = useState([]);

	function getPlantList() {

		api.get(`${process.env.REACT_APP_BASE_PATH}/api/items/allitems`).then(res => {
			setPlantList(res);
			setFilteredPlantList(res);
			console.log(res)
		})
	}

	useEffect(getPlantList, []);

	if (plantList.length === 0) {
		return <Loader />
	}
	const allImages = plantList.map(plant => plant.cover)

	const categories = plantList.reduce(
		(acc, plant) =>
			acc.includes(plant.category) ? acc : acc.concat(plant.category),
		[]
	)
	const handleChange = (e) => {
		setFilteredPlantList(plantList.filter(plant => plant.name.toLowerCase().startsWith(e.target.value.toLowerCase())))
	}
	return (
		<div className='mb-shopping-list'>
			<div className='filters'>
				<div></div>
				<Categories
					categories={categories}
					setActiveCategory={setActiveCategory}
					activeCategory={activeCategory}
				/>
				<label className='shopping-list-label'>
					<input type='text' className='input-search' maxLength={14} size={14} placeholder='search' onChange={handleChange} />
					<CiSearch className='search-icon' />
				</label>
			</div>
			<ul className='mb-plant-list'>
				{fiteredPlantList.map((
					{ barcode, cover, name, water, light, price, category, stock, stockReal = stock, description }) =>
					!activeCategory || activeCategory === category ? (
						<div key={barcode} className='one-plant-item'>
							<PlantItem
								cover={cover}
								name={name}
								water={water}
								light={light}
								price={price}
								barcode={barcode}
								stock={stock}
								description={description}
								images={allImages}
							/>
						</div>
					) : null
				)}
			</ul>
		</div>
	)
}

export default ShoppingList
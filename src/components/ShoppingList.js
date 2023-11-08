import { useState ,useEffect } from 'react'
import PlantItem from './PlantItem'
import Categories from './Categories'
import '../styles/ShoppingList.css'
import Loader from './Loader'
import api from '../functions/API_Calls/apiCalls'
import process from "process"; 

function ShoppingList(){
	const [activeCategory, setActiveCategory] = useState('')
	const [plantList, setPlantList]=useState([]);
	
  	 function getPlantList(){
	 api.get(`${process.env.REACT_APP_BASE_PATH}/api/items/allitems`).then(res=>{setPlantList(res);})
     }

   useEffect(getPlantList,[]);

	if( plantList.length===0) {
		return   <Loader/>
	}
	const categories = plantList.reduce(
		(acc, plant) =>
			acc.includes(plant.category) ? acc : acc.concat(plant.category),
		[]
	)
    
	return (
		<div className='mb-shopping-list'>
			<Categories
				categories={categories}
				setActiveCategory={setActiveCategory}
				activeCategory={activeCategory}
			/>

			<ul className='mb-plant-list'>
				{plantList.map(({ barcode, cover, name, water, light, price, category, stock, stockReal=stock }) =>
					!activeCategory || activeCategory === category ? (
						<div key={barcode}>
							<PlantItem
								cover={cover}
								name={name}
								water={water}
								light={light}
								price={price}
								barcode={barcode}
								stock={stock}
							/>
						</div>
					) : null
				)}
			</ul>
		</div>
	)
}

export default ShoppingList
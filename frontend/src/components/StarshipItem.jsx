import React from 'react'
import {useDispatch} from 'react-redux'
import {removeStarship} from '../features/starships/starshipSlice'

function StarshipItem({starship}) {

    const dispatch =  useDispatch()
    
  return (
    <div className="starship">
        <div>
            {new Date(starship.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{starship.shipName}</h2>
        <p>Registry: {starship.shipRegistry}</p>
        <p>Class: {starship.shipClass}</p>
        <p>Manufacturer: {starship.manufacturer}</p>
        <p>Top Speed: {starship.topSpeed}</p>
        <button onClick={() => dispatch(removeStarship(starship._id))} className='close'>&#9762;</button>
    </div>
  )
}

export default StarshipItem
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setStarship } from '../features/starships/starshipSlice'

function StarshipForm() {

    const [formData, setFormData] = useState({
        shipName: '',
        shipRegistry: '',
        shipClass: '',
        topSpeed: '',
        manufacturer: '',
    })

    const { shipName, shipRegistry, shipClass, topSpeed, manufacturer } = formData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };
    
    const onSubmit = (e) => {
        e.preventDefault();

        const starshipFormData = {
            shipName,
            shipRegistry,
            shipClass,
            topSpeed,
            manufacturer
        }
     
        console.log(`${JSON.stringify(starshipFormData)}`)

        dispatch(setStarship(starshipFormData))

        setFormData({
            shipName: '',
            shipRegistry: '',
            shipClass: '',
            topSpeed: '',
            manufacturer: ''
        })
    
    };

  return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Ship Name</label>
                    <input 
                        type="text" 
                        name='shipName' 
                        id='shipName' 
                        value={shipName} 
                        placeholder='ex. Millenium Falcon'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Ship Registry</label>
                    <input 
                        type="text" 
                        name='shipRegistry' 
                        id='shipRegistry' 
                        value={shipRegistry} 
                        placeholder='ex. YT492727ZED'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Ship Class</label>
                    <input 
                        type="text" 
                        name='shipClass' 
                        id='shipClass' 
                        value={shipClass}
                        placeholder='ex.YT-1300F light freighter' 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Top Speed</label>
                    <input 
                        type="number" 
                        name='topSpeed' 
                        id='topSpeed' 
                        value={topSpeed} 
                        placeholder='ex. 75'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">manufacturer</label>
                    <input 
                        type="text" 
                        name='manufacturer' 
                        id='manufacturer' 
                        value={manufacturer} 
                        placeholder='ex. Corellian Engineering Corporation'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <button type='submit' className="btn btn-block">Add Starship</button>
                </div>
            </form>
        </section>
  )
}

export default StarshipForm
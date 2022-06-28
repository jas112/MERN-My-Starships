import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStarships, reset } from '../features/starships/starshipSlice'
import StarshipForm from '../components/StarshipForm';
import StarshipItem from '../components/StarshipItem';
import Spinner from '../components/Spinner';



function Dashboard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { starships, isLoading, isError, message } = useSelector((state) => state.starships)

    useEffect(() => {

        if(!user){
            navigate('/login')
        }

        if(isError){
            console.log(message);
        }

        return () => {
            dispatch(reset())
        }

    }, [user, isError, message, navigate, dispatch])

    if(isLoading){
        return <Spinner/>
    }

  return (
      <>
        <section className='heading'>
            <h1> Welcome {user && user.firstName + ' ' + user.lastName}</h1>
            <p>You are logged in!!!!</p>
        </section>
        <StarshipForm/>

        <section className='content'>

            {starships.length > 0 ? (
                <div className="starships">
                    {starships.map((starship) => (
                                <StarshipItem key={starship._id} starship={starship} />
                            )
                        )
                    }
                </div>
            ) : (
                <h3> You have not collected any starships.</h3>
                )
            }
            
        </section>

    </>

  )
}

export default Dashboard;
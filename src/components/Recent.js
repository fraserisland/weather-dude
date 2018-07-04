import React from 'react'
import {Link} from 'react-router-dom'

class Recent extends React.Component{
    state = {
        recentCities: []
    }

    componentDidMount(){
        try {
             this.setState({ recentCities: JSON.parse(localStorage.getItem('cities')) })
        } catch(e) {
            console.log(e)
        }
    }

    render(){
        const {recentCities} = this.state
        return (
        <div className="recents"> 
            <p> Your recent weather reports: </p>
            {
                recentCities?
                recentCities.map((city, index) => {
                   return <Link to={{pathname: '/', state: {recentSearch: city} }} key= {index}> { city } </Link>
                })
                :
                <p> No previous searches! </p>
            }
        </div>
        )
    }
}

export default Recent
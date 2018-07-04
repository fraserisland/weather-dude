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
            <ul>
            {
                recentCities?
                recentCities.map((city, index) => {
                   return <li><Link to={{pathname: '/',
                            state: {recentSearch: city} }} 
                            className="recents--link" 
                            key= {index}> { city } </Link></li>
                })
                :
                <p> No previous searches! </p>
            }
            </ul>
        </div>
        )
    }
}

export default Recent
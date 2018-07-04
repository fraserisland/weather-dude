import React from 'react'
import {Switch, BrowserRouter, Route} from 'react-router-dom'

import Header from '../components/Header.js'
import Recent from '../components/Recent.js'
import Report from '../components/Report.js'
import NotFoundPage from '../components/NotFoundPage.js'

import '../styles/style.css'


const AppRouter = () => (
    <BrowserRouter> 
       <div>
        <Header />
        <Switch>
            <Route path="/" component={Report} exact={true} />
            <Route path="/recents" component={Recent} />
            <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
)

export default AppRouter
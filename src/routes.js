import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Feed from './pages/Feed/index.js'
import New from './pages/New/index.js'

export default function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={Feed}/>
            <Route path='/new' component={New}/>
        </Switch>
    )
}
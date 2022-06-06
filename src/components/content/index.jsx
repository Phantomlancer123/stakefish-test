import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import ExchangeTable from '@/pages'

const Content = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <ExchangeTable />
                </Route>
                <Route path="/detail/:exchangeId">
                    <div>details</div>
                </Route>
            </Switch>
        </Router>
    )
}

export default Content

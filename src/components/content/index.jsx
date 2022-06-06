import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

const Content = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div>table</div>
                </Route>
                <Route path="/detail/:exchangeId">
                    <div>details</div>
                </Route>
            </Switch>
        </Router>
    )
}

export default Content

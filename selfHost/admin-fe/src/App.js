import React, { Component, Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import MainLayout from 'components/MainLayout'
import NotFound from 'components/NotFound'
import 'App.scss'
import Loading from './components/common/Loading'
import Home from './components/Home'
import BookList from './components/Book/List'

class App extends Component {
  render () {
    return (
      <MainLayout>
        <Suspense
          fallback={<Loading/>}
        >
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/book/list" exact component={BookList}/>
            <Route component={NotFound}/>
          </Switch>
        </Suspense>
      </MainLayout>
    )
  }
}

export default App

import React, { Component, Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import MainLayout from 'components/MainLayout'
import NotFound from 'components/NotFound'
import 'App.scss'
import Loading from './components/common/Loading'

const Home = lazy(() => import('components/Home'))

class App extends Component {
  render () {
    return (
      <MainLayout>
        <Suspense
          fallback={<Loading/>}
        >
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route component={NotFound}/>
          </Switch>
        </Suspense>
      </MainLayout>
    )
  }
}

export default App

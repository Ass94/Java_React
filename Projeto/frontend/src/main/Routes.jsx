import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Usuario from '../components/usuarios/Usuario'

//componente funcional

export default props =>
<Switch>
    <Route exact path='/' component={Home} />
    <Route path='/usuarios' component={Usuario} />
    <Redirect from='*' to='/' />
</Switch>
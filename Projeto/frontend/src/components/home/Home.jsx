import React from 'react'
import Main from '../template/Main'

// componente funcional
export default props => 
    <Main icon="home" title="Início"
        subtitle="Projeto Java - React">
            <div className="display-4">Bem Vindo!</div>
            <hr/>
            <p className="mb-0">
                Sistema para agrupar Java e React
            </p>
        </Main>
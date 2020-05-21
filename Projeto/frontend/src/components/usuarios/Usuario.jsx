import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar, Excluir!'
}

const baseUrl = "http://localhost:8080/usuarios"
const initialState = {
    usuario: {nome: '', email: ''},
    list: []
}

export default class Usuario extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.usuario })
    }

    save() {
        const usuario = this.state.usuario
        const method = usuario.id ? 'put' : 'post'
        const url = usuario.id ? `${baseUrl}/${usuario.id}` : baseUrl
        axios[method](url, usuario)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ usuario: initialState.usuario, list })
            })
    }

    getUpdatedList(usuario, add = true) {
        const list = this.state.list.filter(u => u.id !== usuario.id)
        if(usuario) list.unshift(usuario)
        return list
    }

    updateField(event) {
        const usuario = { ...this.state.usuario }
        usuario[event.target.nome] = event.target.value
        this.setState({ usuario })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.usuario.nome} 
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome" 
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.usuario.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..."
                            />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)} >
                            Salvar    
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar    
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(usuario) {
        this.setState({ usuario })
    }

    remove(usuario) {
        axios.delete(`${baseUrl}/${usuario.id}`).then(resp => {
            const list = this.getUpdatedList(usuario, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Nome</td>
                        <td>E-mail</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(usuario => {
            return (
                <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(usuario)}>
                            <i className="fa fa-pencil"></i>    
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(usuario)}>
                            <i className="fa fa-trash"></i>    
                        </button>
                    </td>

                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
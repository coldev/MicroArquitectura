import React, { Component } from 'react'

import Servicio from '../services/Servicio';

class ListarComponente extends Component {
    constructor(props) {
        super(props)

        this.state = {
                Datacreditos: []
        }
        this.addDatacredito = this.addDatacredito.bind(this);
        this.editDatacredito = this.editDatacredito.bind(this);
        this.deleteDatacredito = this.deleteDatacredito.bind(this);
    }

    deleteDatacredito(id){
        Servicio.deleteDatacredito(id).then( res => {
            this.setState({Datacreditos: this.state.Datacreditos.filter(Datacredito => Datacredito.id !== id)});
        });
    }
    viewDatacredito(id){
        this.props.history.push(`/ver-Datacredito/${id}`);
    }
    editDatacredito(id){
        this.props.history.push(`/adicionar-Datacredito/${id}`);
    }

    componentDidMount(){
        Servicio.getDatacreditos().then((res) => {
            this.setState({ Datacreditos: res.data});
        });
    }

    addDatacredito(){
        this.props.history.push('/adicionar-Datacredito/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Listado Reportados Datacredito</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addDatacredito}> Crear</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Tipo Documento</th>
                                    <th> Documento</th>                                   
                                    <th>   </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Datacreditos.map(
                                        Datacredito => 
                                        <tr key = {Datacredito.id}>
                                             <td> { Datacredito.tipo_documento} </td>   
                                             <td> {Datacredito.documento}</td>                                             
                                             <td>
                                                 <button style={{marginLeft: "40px"}} onClick={ () => this.viewDatacredito(Datacredito.id)} className="btn btn-warning">Consultar </button>
                                                 <button style={{marginLeft: "40px"}} onClick={ () => this.editDatacredito(Datacredito.id)} className="btn btn-info">Actualizar </button>
                                                 <button style={{marginLeft: "40px"}} onClick={ () => this.deleteDatacredito(Datacredito.id)} className="btn btn-danger">Borrar </button>                                                 
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListarComponente

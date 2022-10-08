import React, { Component } from 'react'

import Servicio from '../services/Servicio'

class VerComponente extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            Datacredito: {}
        }
    }

    componentDidMount(){
        Servicio.getDatacreditoById(this.state.id).then( res => {
            this.setState({Datacredito: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Consultar</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Tipo Documento :  </label>
                            <div> { this.state.Datacredito.tipo_documento }</div>
                        </div>
                        <div className = "row">
                            <label> Documento :  </label>
                            <div> { this.state.Datacredito.documento }</div>
                        </div>
                                                
                    </div>

                </div>
            </div>
        )
    }
}

export default VerComponente

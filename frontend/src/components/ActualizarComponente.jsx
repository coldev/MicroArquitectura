import React, { Component } from 'react'
import DatacreditoService from '../services/Servicio';

class ActualizarComponente extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            tipo_documento: '',
            documento: ''            
        }
        this.Cambiartipodocumento = this.Cambiartipodocumento.bind(this);
        this.Cambiardocumento = this.Cambiardocumento.bind(this);
        this.ActualizarDatos = this.ActualizarDatos.bind(this);
    }

    componentDidMount(){
        DatacreditoService.getDatacreditoById(this.state.id).then( (res) =>{
            let Datacredito = res.data;
            this.setState({
                tipo_documento: Datacredito.tipo_documento,
                documento: Datacredito.documento
            });
        });
    }

    ActualizarDatos = (e) => {
        e.preventDefault();
        let Datacredito = {tipo_documento: this.state.tipo_documento, documento: this.state.documento};
        console.log('Datacredito => ' + JSON.stringify(Datacredito));
        console.log('id => ' + JSON.stringify(this.state.id));
        DatacreditoService.updateDatacredito(Datacredito, this.state.id).then( res => {
            this.props.history.push('/Datacreditos');
        });
    }
    
    Cambiartipodocumento= (event) => {
        this.setState({tipodocumento: event.target.value});
    }

    Cambiardocumento= (event) => {
        this.setState({documento: event.target.value});
    }
   

    cancel(){
        this.props.history.push('/Datacreditos');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Actualizar</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Tipo Documento: </label>
                                            <input placeholder="tipo documento" name="tipo_documento" className="form-control" 
                                                value={this.state.tipodocumento} onChange={this.Cambiartipodocumento}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Documento: </label>
                                            <input placeholder="documento" name="documento" className="form-control" 
                                                value={this.state.documento} onChange={this.Cambiardocumento}/>
                                        </div>                                       

                                        <button className="btn btn-success" onClick={this.ActualizarDatos}>Grabar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default ActualizarComponente

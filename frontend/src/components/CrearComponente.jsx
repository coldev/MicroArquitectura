import React, { Component } from 'react'
import Servicio from '../services/Servicio';

class CrearComponente extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            tipo_documento: '',
            documento: ''           
        }
        this.Cambiartipodocumento = this.Cambiartipodocumento.bind(this);
        this.Cambiardocumento = this.Cambiardocumento.bind(this);
        this.ActualizarDatos = this.ActualizarDatos.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            Servicio.getDatacreditoById(this.state.id).then( (res) =>{
                let Datacredito = res.data;
                this.setState({
                    tipo_documento: Datacredito.tipo_documento,
                    documento: Datacredito.documento
                });
            });
        }        
    }

    ActualizarDatos = (e) => {
        e.preventDefault();
        let Datacredito = {tipo_documento: this.state.tipo_documento, documento: this.state.documento};
        console.log('Datacredito => ' + JSON.stringify(Datacredito));

        // step 5
        if(this.state.id === '_add'){
            Servicio.createDatacredito(Datacredito).then(res =>{
                this.props.history.push('/Datacreditos');
            });
        }else{
            Servicio.updateDatacredito(Datacredito, this.state.id).then( res => {
                this.props.history.push('/Datacreditos');
            });
        }
    }
    
    Cambiartipodocumento= (event) => {
        this.setState({tipo_documento: event.target.value});
    }

    Cambiardocumento= (event) => {
        this.setState({documento: event.target.value});
    }

    
    cancel(){
        this.props.history.push('/Datacreditos');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Crear</h3>
        }else{
            return <h3 className="text-center">Actualizar</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Tipo Documento: </label>
                                            <input placeholder="tipo documento" name="tipo_documento" className="form-control" 
                                                value={this.state.tipo_documento} onChange={this.Cambiartipodocumento}/>
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

export default CrearComponente

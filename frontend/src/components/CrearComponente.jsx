import React, { Component } from 'react'
import Servicio from '../services/Servicio';
 
class CrearComponente extends Component {
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

    maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }

    
    ValidarDatos= ()  =>
    {
        if (this.state.tipo_documento.trim().length === 0 ||
            this.state.documento.trim().length === 0  )
        {
         alert('Datos no válidos.');   
         return false;
        }

         return true;
    }


    ActualizarDatos = (e) => {
        e.preventDefault();

        if (! this.ValidarDatos())
        {            
            return;
        }

        let Datacredito = {tipo_documento: this.state.tipo_documento, documento: this.state.documento};
        console.log('Datacredito => ' + JSON.stringify(Datacredito));

        
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
                                            <select name="tipo_documento" value={this.state.tipo_documento} onChange={this.Cambiartipodocumento} className="form-control">
                                                <option value="" selected>Seleccione</option>
                                                <option value="CC">Cédula de ciudadanía</option>
                                                <option value="CE">Cédula de Extranjería</option>
                                                <option value="PA">Pasaporte</option>
                                                <option value="TI">Tarjeta de identidad</option>
                                                <option value="RC">Registro civil</option>
                                            </select>
                                        </div> 
                                        
                                        <div className = "form-group">
                                            <label> Documento: </label>
                                            <input placeholder="documento" name="documento" className="form-control" maxLength="30" type='number' onInput={this.maxLengthCheck}
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

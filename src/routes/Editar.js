import React from 'react';
import { Link } from 'react-router-dom';

import api from "../servicies/api";

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados: false,
            usuario: [] 
        }
    }

    componentDidMount() {
        fetch("http://localhost/projects/usuarios/?consultar="+this.props.match.params.id)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.setState({
                datosCargados: true,
                usuario: datosRespuesta[0]
            })
        })
        .catch(console.log)
    }

    cambioValor = (e) => {
        const state = this.state.usuario;

        state[e.target.name] = e.target.value;
        this.setState({usuario: state});
    }

    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado...");

        const {id, nombre, correo} = this.state.usuario;

        var datosEnviar = {
            id: id,
            nombre: nombre, 
            correo: correo
        };

        fetch(api + "?actualizar=1", {
            method: "POST",
            body: JSON.stringify(datosEnviar)
        })
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.props.history.push("/");
        })
        .catch(console.log)
    }

    render() {

        const{datosCargados, usuario} = this.state;

        if (!datosCargados) {
            return (
                <div>
                    Cargando... :D
                </div>
            );
        } else {
            return ( 
                <div className="card">
                    <div className="card-header">
                        Editar Usuarios
                    </div>
    
                    <div className="card-body">
                        <form onSubmit={this.enviarDatos}>

                            <div className="form-group">
                              <label htmlFor="">Clave:</label>
                              <input type="text" readOnly name="id" id="id" value={usuario.id} onChange={this.cambioValor} className="form-control" placeholder="" aria-describedby="helpId" />
                            </div><br />
    
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input required type="text" name="nombre" value={usuario.nombre} onChange={this.cambioValor} id="nombre" className="form-control" placeholder=""/>
                            </div><br />
    
                            <div className="form-group">
                                <label htmlFor="correo">Correo</label>
                                <input required type="text" name="correo" value={usuario.correo} onChange={this.cambioValor} id="correo" className="form-control" placeholder=""/>
                            </div><br />
    
                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Actualizar usuario</button>
                                <Link className="btn btn-danger" to="/">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}
 
export default Editar;
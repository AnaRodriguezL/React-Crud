import React from 'react';
import { Link } from "react-router-dom";

import  api  from "../servicies/api";

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            correo: "",
            errores: []
        }
    }

    verificarError(elemento) {
        return this.state.errores.indexOf(elemento) !== -1;
    }

    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado...");

        const{nombre, correo} = this.state;

        var errores = [];

        if (!nombre) errores.push("error_nombre");
        if (!correo) errores.push("error_correo");

        this.setState({errores: errores});

        if (errores.length > 0) return false;

        var datosEnviar = {
            nombre: nombre, 
            correo: correo
        };

        fetch(api + "?insertar=1", {
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

    cambioValor = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state, errores: []});
    }

    render() {

        const{nombre, correo} = this.state;

        return (
            <div className="card">
                <div className="card-header">
                    Usuarios
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" value={nombre} onChange={this.cambioValor} id="nombre" className={((this.verificarError("error_nombre")) ? "is-invalid":"") + " form-control"} placeholder=""/>
                        </div><br />

                        <div className="form-group">
                            <label htmlFor="correo">Correo</label>
                            <input type="text" name="correo" value={correo} onChange={this.cambioValor} id="correo" className={((this.verificarError("error_correo")) ? "is-invalid":"") + " form-control"} placeholder=""/>
                        </div><br />

                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Agregar nuevo usuario</button>
                            <Link className="btn btn-danger" to="/">Cancelar</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Crear;
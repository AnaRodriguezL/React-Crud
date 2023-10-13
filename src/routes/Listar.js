import React from "react";
import { Link } from "react-router-dom";

import api from '../servicies/api';

class Listar extends React.Component {
    constructor(props) {
        super(props);

        // Para verificar si la información si esta llegando o no, se crea un estado.
        this.state = { 
            datosCargados: false,
            usuarios: [] 
        }
    }

    cargarDatos() {
        // Se piden datos mediante la api
        fetch(api)

        // Después la respuesta que se obtiene se recibe en JSON
        .then(respuesta => respuesta.json())

        // Si la información llega, lo mostrara con la variable de datos
        .then((datosRespuesta) => {
            console.log(datosRespuesta);

            // Cambia de estado cuando se reciben los datos
            this.setState({
                datosCargados: true,
                usuarios: datosRespuesta
            })
        })

        // Imprime los errores en consola
        .catch(console.log)
    }

    borrarDatos = (id) => {
        fetch(api + "?borrar=" + id)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.cargarDatos();
        })
        .catch(console.log)
    }



    // Actualiza los componente con los datos pedidos.
    componentDidMount() {
        this.cargarDatos();
    }

    render() { 
        const{datosCargados, usuarios} = this.state;

        if (!datosCargados) {
            // Si no hay datos
            return (
                <div>
                    Cargando... :D
                </div>
            )
        } else {
            // Si hay datos
            return (  
                <div className="card">
                    <div className="card-body">
                        <h4>Lista de Usuarios</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
            
                            <tbody>
                                {/* El mapeo funciona como el for each, de la misma forma, pero más elegante */}
                                {usuarios.map(
                                    (usuario) => (
                                        
                                        // Se coloca esa llave ya que indica una llave única para controlar los registros.
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.correo}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="">
                                                    <Link className="btn btn-warning" to={"/editar/"+usuario.id}>
                                                        Editar
                                                    </Link>


                                                    <button type="button" className="btn btn-danger" onClick={() => this.borrarDatos(usuario.id)}>
                                                        Borrar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">
                        <Link className="btn btn-success" to="/crear">Agregar Nuevo Usuario</Link>
                    </div>
                </div>

                
            );
        }
    }
}
 
export default Listar;
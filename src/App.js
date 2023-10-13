import './App.css';

// COMPONENTES
import Listar from "./routes/Listar";
import Crear from "./routes/Crear";
import Editar from "./routes/Editar";

// RUTAS
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="nav navbar-nav">
                    <Link className="nav-item nav-link active" to="/">Sistema </Link>
                </div>
            </nav>

            <div className='container'><br />
                <Route exact path='/' component={ Listar }></Route>
                <Route path='/crear' component={ Crear }></Route>
                <Route path='/editar/:id' component={ Editar }></Route>
            </div>
        </Router>
    );
}

export default App;
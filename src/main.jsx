
import { createRoot } from 'react-dom/client'

// Importacion de Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css';

// Importacion de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importacion del componente principal
import ColeccionNumi from './components/coleccionList.jsx';

createRoot(document.getElementById('root')).render(<ColeccionNumi/>);

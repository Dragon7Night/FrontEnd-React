
import { Fragment } from "react";

const ColeccionItem = ({ item, onEditar, onEliminar }) => {
  // dividir los campos del item
  const { nombrePieza, tipo, paisOrigen, anioEmision, valorEstimado, estadoConservacion } = item;

  return (
    <Fragment>

        <li className="list-group-item list-group-item-action list-group-item-info d-flex justify-content-between align-items-center my-2 p-3 border rounded shadow-sm">
          
          {/* Contenedor de datos con ancho completo */}
          <div className="w-100 me-3">

            {/* Grupo de elementos */}
            <div className="row g-2">

                {/* Título de la pieza */}
                <div className="col-6">
                    <h5 className="mb-2 text-dark fw-bold"> {nombrePieza}</h5>
                </div>

                {/* Valor estimado */}
                <div className="col-6">
                    <h5 className="mb-2 text-dark fw-bold"> ${valorEstimado} USD</h5>

            </div>

            {/* `-------------------- */}

            </div>

            {/* Grupo de elementos */}
            <div className="row g-2 small">

              <div className="col-6">
                <strong>Tipo:</strong> {tipo}
              </div>

              <div className="col-6">
                <strong>País de origen:</strong> {paisOrigen}
              </div>

              <div className="col-6">
                <strong>Año de emisión:</strong> {anioEmision}
              </div>

              <div className="col-6">
                <strong>Estado de conservación:</strong> {estadoConservacion}
              </div>
            </div>

          </div>

          {/* Botones de acciones */}
          <div className="d-flex flex-column gap-2">
            <i className="bi bi-pencil-square text-success fs-4" onClick={onEditar}></i>
            <i className="bi bi-trash3-fill text-danger fs-4" onClick={onEliminar}></i>
          </div>
        </li>
        
    </Fragment>
  );
};

export default ColeccionItem;



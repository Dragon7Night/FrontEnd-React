import { Fragment, useState, useRef, useEffect } from 'react'

// Importacion para identificador unico
import uuid4 from "uuid4";

import ColeccionItem from "./coleccionItem.jsx";

const ColeccionNumi = () => {
    
    // valor actual, funcion modificada
    /* 
    items =  se usa cuando se manejan array de datos,
             al principio se le dice, crea un array vacio.
    
    setItems =  se usa para hacer el CRUD en los items,
                se llama cada vez que se hace una de estas operaciones.
    */
    const [items, setItems] = useState([]);
    
    // campos (refs del form)
    /*
        El uso de useRef, permite hacer referencias mas rapidas en el codigo (jsx) 
        por la tag de ref={}, ademas de que permite definir variables que puede 
        ser mutables en sus valores
    */
    const nombrePiezaRef = useRef();
    
    // Tipo: Moneda o Billete
    const tipoRef = useRef();
    const paisOrigenRef = useRef();
    const anioEmisionRef = useRef();
    
    // Valor debe ser USD
    const valorEstimadoRef = useRef();
    
    // Estado: Malo, Regular, Bueno o Excelente
    const estadoConservacionRef = useRef();

    // -----------------------------------------------------------------------

    // TAG identificadora
    /*
        Permite identificar los datos que estan dentro del localStorage, ya que al 
        momento de crear un nuevo item se le asigna esta TAG (segundo bloque de 
        useEffect), es mas facil identificar y traer los datos despues con el primero 
        bloque de useEffect 
    */
    const TAG = 'coleccionTag'
    
    // carga los datos guardados en el localStorage al iniciar la pagina
    useEffect(() => {
        const registro = JSON.parse(localStorage.getItem(TAG));
        if (registro){
            setItems(registro)
        }
    }, []);

    // -----------------------------------------------------------------------

    // guarda los datos en el localStorage cuando se modifican los datos (items)
    useEffect(() => {
        localStorage.setItem(TAG, JSON.stringify(items));
    }, [items]);

    // -----------------------------------------------------------------------

    const agregarItem = () => {
        const nombrePieza = nombrePiezaRef.current.value.trim();
        const tipo = tipoRef.current.value;
        const paisOrigen = paisOrigenRef.current.value.trim();
        const estadoConservacion = estadoConservacionRef.current.value;

        // numero entero (base 10)
        const anioEmision = parseInt(anioEmisionRef.current.value, 10);
        // numero de punto fotante (USD)
        const valorEstimado = parseFloat(valorEstimadoRef.current.value);


        /* ` TIPOS DE OPERADORES
            ||  actual como un OR, en donde SOLO UNA de las condiciones 
                debe ser verdadera para pasar

            &&  actua como un AND, en donde TODAS las condiciones deben
                ser verdades para pasar
        */

        // Validacion simple - completar todos los campos
        /* 
            tipo === '0'
            estadoConservacion === '0'        
            son las validaciones de listas, ya que ese será su valor por defecto
        */
        if (!nombrePieza || tipo === '0' || !paisOrigen || !anioEmision || !valorEstimado || estadoConservacion === '0'){
            alert("ERROR.. por favor complete todos los campos");
            return;
        }

        // Validacion simple - el año no debe ser mayor al actual
        if (anioEmision > 2026 || anioEmision < 0){
            alert('ERROR.. por favor ingrese un año de emisión adecuado');
            return;
        }

        // validacion simple - valor mayor a cero
        if (valorEstimado <= 0 || isNaN(valorEstimado)) {
            alert("ERROR.. el valor estimado debe ser mayor a cero");
            return;
        }

        // validacion avanzada - no pueden existir piesas con el mismo nombre y año

        
        // ---------------------------

        // Crear objeto del item para registrar
        setItems((prevItems) => {
            const nuevoItem = {
                id : uuid4(), // Identificador unico 
                nombrePieza : nombrePieza,
                tipo : tipo, // Moneda o Billete
                paisOrigen : paisOrigen,
                anioEmision : anioEmision,
                valorEstimado : valorEstimado,
                estadoConservacion : estadoConservacion, // Malo, Regular, Bueno o Excelente
            }
            return [...prevItems, nuevoItem];
        });

        // ---------------------------

        // Limpiar valores del formulario 
        nombrePiezaRef.current.value = '';
        paisOrigenRef.current.value = '';
        anioEmisionRef.current.value = '';
        valorEstimadoRef.current.value = '';

        // listas (valor por defecto 0)
        tipoRef.current.value = '0';
        estadoConservacionRef.current.value = '0';
    
    }; // cierre de agregarItem

    // -----------------------------------------------------------------------

    const eliminarItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        }; // cierre de eliminarItem

    // -----------------------------------------------------------------------

    const editarItem = (id) => {

    // buscar item por ID
    const piezaActual = items.find((item) => item.id === id);
    if (!piezaActual) return;

    // pedir los nuevos valores
    const nuevoNombre = prompt("Nuevo nombre de la pieza:", piezaActual.nombrePieza);
    if (!nuevoNombre) return;

    const nuevoTipo = prompt("Nuevo tipo (Moneda / Billete):", piezaActual.tipo);
    if (!nuevoTipo) return;

    const nuevoPais = prompt("Nuevo país de origen:", piezaActual.paisOrigen);
    if (!nuevoPais) return;

    const nuevoAnio = parseInt(prompt("Nuevo año de emisión:", piezaActual.anioEmision), 10);
    if (isNaN(nuevoAnio) || nuevoAnio > 2026) {
        alert("Año inválido.");
        return;
    }

    const nuevoValor = parseFloat(prompt("Nuevo valor estimado (USD):", piezaActual.valorEstimado));
    if (isNaN(nuevoValor) || nuevoValor <= 0) {
        alert("Valor inválido.");
        return;
    }

    const nuevoEstado = prompt("Nuevo estado (Malo / Regular / Bueno / Excelente):", piezaActual.estadoConservacion);
    if (!nuevoEstado) return;

    // actualizar objeto 
    setItems((prevItems) =>
        prevItems.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    nombrePieza: nuevoNombre.trim(),
                    tipo: nuevoTipo,
                    paisOrigen: nuevoPais.trim(),
                    anioEmision: nuevoAnio,
                    valorEstimado: nuevoValor,
                    estadoConservacion: nuevoEstado
                };
            }
            return item;
        })); // cierre de setItems
    }; // cierre de editarItem

    return (
        <Fragment>

        <h1 className="text-center mt-4 mb-4">🪙 Colección Numismática 💵</h1>
        <div className="container my-4 col-12 col-md-8 col-lg-6" >

            {/* Formulario */}
            <div className="card p-4 bg-light mb-4">
                <h3 className="card-title text-center fw-bold mb-5">Registrar una nueva pieza</h3>

                <div className="row">

                    {/* Nombre de la pieza */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Nombre de la pieza:</label>
                        <input type="text" ref={nombrePiezaRef} className="form-control" placeholder="Ej: Peso Chileno" />
                    </div>

                    {/* País de origen */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">País de origen:</label>
                        <input type="text" ref={paisOrigenRef} className="form-control" placeholder="Ej: Chile" />
                    </div>
                </div>

                {/* ------------------------ */}

                <div className="row">

                    {/* Tipo */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Tipo:</label>
                        <select ref={tipoRef} className="form-select" defaultValue="0">
                            <option value="0">Seleccione el tipo</option>
                            <option value="Moneda">Moneda</option>
                            <option value="Billete">Billete</option>
                        </select>
                    </div>

                    {/* Estado de conservación */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Estado de conservación:</label>
                        <select ref={estadoConservacionRef} className="form-select" defaultValue="0">
                            <option value="0">Seleccione el estado</option>
                            <option value="Malo">Malo</option>
                            <option value="Regular">Regular</option>
                            <option value="Bueno">Bueno</option>
                            <option value="Excelente">Excelente</option>
                        </select>
                    </div>
                </div>

                {/* ------------------------ */}

                <div className="row">
                    {/* Año de emisión */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Año de emisión:</label>
                        <input type="number" ref={anioEmisionRef} className="form-control" placeholder="Ej: 2021" />
                    </div>

                    {/* Valor estimado */}
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Valor estimado (USD):</label>
                        <input type="number" step="10" ref={valorEstimadoRef} className="form-control" placeholder="Ej: 2500" />
                    </div>
                </div>

                {/* Botón de registrar */}
                <button className="btn btn-success w-100 mt-2 fw-semibold" onClick={agregarItem} type="button">
                    <i className="bi bi-plus-circle-fill me-2"></i>Agregar a la Colección
                </button>
            </div>
            
            {/* Listado de Piezas */}
            <h5 className="mb-3">Colección de registrada</h5>
            <ul className="list-group">
                {items.length === 0 ? (
                    <li className="list-group-item text-center text-muted">No hay piezas registradas aún.</li>
                ) : (
                    items.map((item) => (
                        <ColeccionItem
                            key={item.id}
                            item={item}
                            onEliminar={() => eliminarItem(item.id)}
                            onEditar={() => editarItem(item.id)}
                        />
                    ))
                )}
            </ul>
        </div>
    </Fragment>
    );
    }; // cierre de ColeccionNumi


export default ColeccionNumi;
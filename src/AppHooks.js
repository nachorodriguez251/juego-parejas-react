import React, { useReducer } from 'react'
import './App.css';
import Header from './functionalComponents/Header/Header';
import Tablero from './functionalComponents/Tablero/Tablero';
import construirBaraja from './utils/construirBaraja.js';

export const AppContext = React.createContext();

// const baraja = construirBaraja();
// const initialState = {
//     baraja,
//     parejaSeleccionada: [],
//     estaComparando: false,
//     numeroIntentos: 0,
//   };

const getEstadoInicial = () => {
    const baraja = construirBaraja();
    return {
        baraja,
        parejaSeleccionada: [],
        estaComparando: false,
        numeroIntentos: 0,
    }
}

const initialState = getEstadoInicial();

function reducer(state, action)
{
    switch(action)
    {
        case 'reiniciar':
            console.log('reiniciar');
            return getEstadoInicial();
        case 'seleccionarCarta':
            console.log('seleccionarCarta');
            return { ...state, numeroIntentos: state.numeroIntentos+ 1}
        default: 
            return state;
    }
}

function AppHooks() 
{
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider 
				value={{ appState: state, appDispatch: dispatch}}
			>
            <div>
                <Header/>
                <Tablero />
            </div>
        </AppContext.Provider>
    )
}

export default AppHooks

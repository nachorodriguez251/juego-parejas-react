import React, {useContext} from 'react';
import './Header.css';
import {AppContext} from '../../AppHooks';

function Header() {
    const appContext = useContext(AppContext);
    return (
        <header>
            <div className="titulo"> React-Parejas-Hooks </div>
            <div>
                <button className="boton-reiniciar" onClick={() => appContext.appDispatch('reiniciar')}> 
                    Reiniciar 
                </button>
            </div>
            <div className="titulo">  Numero Intentos: {appContext.appState.numeroIntentos} </div>
        </header>
    )
}

export default Header

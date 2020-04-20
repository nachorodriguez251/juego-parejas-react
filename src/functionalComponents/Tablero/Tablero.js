import React, {useContext} from 'react';
import './Tablero.css';
import { AppContext } from '../../AppHooks';
import Carta from '../../components/Carta/Carta';

function Tablero() {
    const appContext = useContext(AppContext);
    return (
        <div className="tablero">
            {
                appContext.appState.baraja
                    .map((carta, index) => 
                    {
                        const estaSiendoComparada = appContext.appState.parejaSeleccionada.indexOf(carta) > -1;
                        return <Carta
                            key={index}
                            icono={carta.icono}
                            estaSiendoComparada={estaSiendoComparada}
                            fueAdivinada={carta.fueAdivinada}
                            seleccionarCarta={() => appContext.appDispatch('seleccionarCarta')}   
                            />;
                    })
            }
        </div>
    )
}

export default Tablero

import React, { useContext } from 'react';
import './Carta.css'
import ReactCardFlip from "react-card-flip";
import AppContext from '../../AppHooks';

export default function Carta() {
    const appContext = useContext(AppContext);
    return (
        //  <div className="carta" {() => appContext.appDispatch('seleccionarCarta')}>
        <div className="carta" onClick={() => this.props.seleccionarCarta}>  
        <ReactCardFlip
          isFlipped={this.props.estaSiendoComparada || this.props.fueAdivinada}
        >
          <div className="portada" key="front"></div>
          <div className="contenido" key="back">
            <i className={`fa ${this.props.icono} fa-5x`}></i>
          </div>
        </ReactCardFlip>
      </div>
    )
}

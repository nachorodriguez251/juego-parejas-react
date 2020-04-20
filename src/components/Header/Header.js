import React, { Component } from 'react';
import './Header.css';

export class Header extends Component {
    render() {
        return (
            <header>
                <div className="titulo">React-Parejas</div>
                <div>
                    <button onClick={ this.props.resetarPartida } className="boton-reiniciar">
                        Reiniciar
                    </button>
                </div>
                <div className="titulo">Intentos: {this.props.numeroIntentos} </div>
            </header>
        )
    }
}

export default Header

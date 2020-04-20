import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Tablero from './components/Tablero/Tablero';
import construirBaraja from './utils/construirBaraja.js';

const getEstdoInicial = () => {
  const baraja = construirBaraja();
  return {
    baraja,
    parejaSeleccionada: [],
    estaComparando: false,
    numeroIntentos: 0,
  };
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = getEstdoInicial();
    console.log(this.state);
  }

  seleccionarCarta(carta)
  {
    //si la aplicacion no esta comparando, ni la carta fue adivinada, ni la carta ya
    //fue previamente seleccionada
    if ( !this.state.estaComparando && !carta.fueAdivinada
       && this.state.parejaSeleccionada.indexOf(carta) === -1)
        {
          const parejaSeleccionada = [...this.state.parejaSeleccionada, carta];
          this.setState({ parejaSeleccionada });

          if (parejaSeleccionada.length === 2)
          {
            this.compararPareja(parejaSeleccionada);
          }
        }
  }

  verificarGanador(baraja){
    if (baraja.filter((carta) => !carta.fueAdivinada).length === 0)
    {
      alert(`Ganaste en ${this.state.numeroIntentos} intentos :)`);
    }
  }

  compararPareja(parejaSeleccionada)
  {
    this.setState({estaComparando: true});

    setTimeout(() => {
      const [primeraCarta, segundaCarta] = parejaSeleccionada;
      let baraja = this.state.baraja;

      if (primeraCarta.icono === segundaCarta.icono)
      {
        baraja = baraja.map((carta) => {
          if (carta.icono !== primeraCarta.icono) {
            return carta;
          }
          //separa todas las propiedades de la carta y reemplaza
          //a fueAdivinada con valor true
          return {...carta, fueAdivinada: true};
        });
      }
      
      this.setState({
        parejaSeleccionada: [],
        baraja,
        estaComparando: false,
        numeroIntentos: this.state.numeroIntentos + 1,
      }, () => this.verificarGanador(baraja));
      
    }, 1000);
    
  }

  resetarPartida() {
    this.setState(getEstdoInicial());
  }

  render () {
    return (
      <div className="App">
        <Header
          numeroIntentos = {this.state.numeroIntentos} 
          resetarPartida = {() => this.resetarPartida()}
        />
        <Tablero 
          baraja={ this.state.baraja }
          parejaSeleccionada = { this.state.parejaSeleccionada }
          seleccionarCarta = { (carta) => { this.seleccionarCarta(carta) }}
        />
      </div>
    );
  }
}

export default App;

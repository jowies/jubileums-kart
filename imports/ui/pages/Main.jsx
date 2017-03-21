import React from 'react';
import Kart from '../components/Kart.jsx';
import Menu from '../components/Menu.jsx';
import '../stylesheets/leaflet.scss';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
    this.resize = this.resize.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  setHeight() {
    this.setState({
      height: this.getHeight(),
    });
  }

  getHeight() {
    return (window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight);
  }

  setWidth() {
    this.setState({
      width: this.getWidth(),
    });
  }

  getWidth() {
    return (window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth);
  }

  resize() {
    this.setHeight();
    this.setWidth();
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Menu width={this.state.width} height={this.state.height} />
        {this.props.points.length >= 40 ? <Kart points={this.props.points} height={this.state.height} width={this.state.width} /> : <h3 style={{ color: '#f1f1f1', paddingLeft: 100 }}>Eventet har ikke startet enda, har du allikevel funnet et glass kan du  registrere det ved å trykke på spørsmålsknappen til venstre</h3>}
      </div>
      );
  }
}

Main.propTypes = {
  points: React.PropTypes.array,
  loading: React.PropTypes.bool,
};

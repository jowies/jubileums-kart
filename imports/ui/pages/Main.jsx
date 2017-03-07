import React from 'react';
import Kart from '../components/Kart.jsx';
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
        <div style={{ position: 'absolute', zIndex: '9000' }}>Vi prøvver sånn</div>
        <Kart points={this.props.points} height={this.state.height} width={this.state.width} />
      </div>
      );
  }
}

Main.propTypes = {
  points: React.PropTypes.array,
};

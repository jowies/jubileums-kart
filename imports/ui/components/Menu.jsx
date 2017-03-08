import React from 'react';
import '../stylesheets/leaflet.scss';
import Opened from './Opened.jsx';
import Closed from './Closed.jsx';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(e) {
    e.preventDefault();
    this.setState({
      open: true,
    });
  }

  close(e) {
    e.preventDefault();
    this.setState({
      open: false,
    });
  }


  render() {
    return (
      <div style={{ zIndex: '9000', position: 'absolute' }} >
        {this.state.open ? <Opened width={this.props.width} height={this.props.height} onClick={this.close} /> : <Closed onClick={this.open} />}
      </div>
    );
  }
}

Menu.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number,
};

import React from 'react';
import '../stylesheets/leaflet.scss';

export default class Closed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ padding: '10px 10px 10px 10px' }}>
        <button className="menu" onClick={this.props.onClick} style={{ padding: '10px 10px 10px 10px', boxShadow: '0 1px 5px rgba(0,0,0,0.4)', backgroundColor: '#fafafa', cursor: 'pointer' }}>
          <i style={{ fontSize: '24px' }} className="fa fa-question" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}

Closed.propTypes = {
  onClick: React.PropTypes.func,
};

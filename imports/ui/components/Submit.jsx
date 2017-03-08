import React from 'react';
import '../stylesheets/leaflet.scss';

export default class Submit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        
        <input style={{ boxSizing: 'border-box', display: 'block' }} type="text" />
        
        <input style={{ boxSizing: 'border-box', display: 'block' }} type="text" />
        <input style={{ boxSizing: 'border-box', display: 'block' }} type="button" value="send" />
        
      </div>
    );
  }
}

Submit.propTypes = {
};

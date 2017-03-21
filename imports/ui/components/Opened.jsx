import React from 'react';
import Submit from './Submit.jsx';
import '../stylesheets/leaflet.scss';

export default class Opened extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      successMessage: '',
      submit: false,
    };

    this.registerSuccess = this.registerSuccess.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.setState({
      submit: true,
      success: false,
    });
  }

  registerSuccess(success, successMessage) {
    this.setState({
      successMessage,
      success,
      submit: false,
    });
  }

  renderSuccess() {
    return (
      <div className="border">
        <p>{this.state.successMessage}</p>
      </div>
    );
  }

  renderGreeting() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }} >Glassjakt</h1>
        <p>Glassjakten er en konkurranse arrangert over hele Gløshaugen i regi Abakus sitt 40 års jubileum.</p>
        <p>Gjemt rundt på campus er en rekke ølglass. Finn glasset, skriv inn koden du finner med glasset, og vær med i trekningen av fete premier!</p>
        <input className="button" style={{ margin: '0 auto', display: 'block' }} type="button" value="Fant et glass!" onClick={this.onClick} />
      </div>
    );
  }

  renderSubmit() {
    return (
      <Submit success={this.registerSuccess} />
    );
  }

  renderStuff() {
    if (!this.state.success && !this.state.submit) {
      return this.renderGreeting();
    }
    if (this.state.success) {
      return this.renderSuccess();
    }

    return this.renderSubmit();
  }

  render() {
    return (
      <div style={{ padding: '10px 10px 10px 10px' }}>
        <div style={{ height: this.props.height - 90, maxWidth: 400, width: this.props.width - 20, maxHeight: this.props.height - 75 }} >
          <div style={{ height: '100%', width: '100%', backgroundColor: '#f5f5f5', boxShadow: '0 1px 5px rgba(0,0,0,0.4)' }}>
            <button className="menu" onClick={this.props.onClick} style={{ padding: '10px 10px 10px 10px', backgroundColor: '#f5f5f5', cursor: 'pointer' }}>
              <i style={{ fontSize: '24px' }} className="fa fa-times"></i>
            </button>
            <div style={{ height: '100%', width: '100%', color: '#212121', padding: '0 10px 10px 10px' }}>
              {this.renderStuff()}
              <div style={{ width: '100%', textAlign: 'center', position: 'absolute', bottom: 0 }}><p style={{ fontSize: 12 }}>Laget av Koskom</p></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Opened.propTypes = {
  onClick: React.PropTypes.func,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
};

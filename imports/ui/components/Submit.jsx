import React from 'react';
import '../stylesheets/leaflet.scss';
import { submit } from '../../api/glass/methods.js';

export default class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      code: '',
      error: false,
      errorMessage: '',
      success: false,
      successMessage: '',
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.changeCode = this.changeCode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeEmail(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
  }

  changeCode(e) {
    e.preventDefault();
    this.setState({
      code: e.target.value.toUpperCase(),
    });
  }

  onSubmit(e) {
    e.preventDefault();
    submit.call({ code: this.state.code, email: this.state.email }, (err, data) => {
      if (err) {
        console.log(err);
        this.setState({
          errorMessage: 'Noe gikk feil',
          error: true,
        });
      } else {
        if (data.error) {
          this.setState({
            errorMessage: data.message,
            error: true,
          });
        } else {
          this.props.success(true, data.message);
          this.setState({
            error: false,
            errorMessage: '',
          });
        }
      }
    });
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <p>Skriv inn koden og mailadressen din </p>
        <form>
          <input value={this.state.code} onChange={this.changeCode} placeholder="Kode..." className="inputfield" style={{ marginBottom: 10, display: 'block' }} type="text" />
          <input value={this.state.email} onChange={this.changeEmail} placeholder="Email..." className="inputfield" style={{ marginBottom: 10, display: 'block' }} type="text" />
          <div style={{ textAlign: 'center' }}>
            <input className="button" style={{ margin: '0 auto', display: 'block' }} type="button" value="send" onClick={this.onSubmit} />
          </div>
          {this.state.error ? <p style={{ color: '#b11b11' }}>{this.state.errorMessage}</p> : ''}
        </form>
      </div>
    );
  }
}

Submit.propTypes = {
  success: React.PropTypes.func,
};

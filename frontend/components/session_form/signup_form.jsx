import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      photo: window.profilePic,
      photoUrl: window.profilePic,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  openModal() {
    return this.props.openModal();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.photo === window.profilePic) {
      alert("You must attach a photo!");
    }

    const datas = Object.keys(this.state);
    const data = new FormData();
    const user = Object.assign({}, this.state);
    const defaultPic = new File([""], "../../../app/assets/images/prof_pic1.jpg", { type: "image/jpg"});


    datas.forEach( (input) => {
      if (input === "photoUrl") {
        return;
      }

      if (input === "photo" && this.state.photo === window.profilePic) {
        return data.append(`user[${input}]`, defaultPic);
      }

      return data.append(`user[${input}]`, this.state[input]);
    }, this);

    const promise = this.props.signup(data, user);

    promise.then(this.props.closeModal);
  }

  handleFile(e) {
    const photo = e.currentTarget.files[0];

    let fileReader = new FileReader();

    fileReader.onloadend = () => {

      this.setState({
        photo,
        photoUrl: fileReader.result
      });
    };

    if (photo) {
      fileReader.readAsDataURL(photo);
    }
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li className="session-errors" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const preview = this.state.photoUrl ?
      <div className="img-attach-container"><img className="img-attach" src={this.state.photoUrl}></img></div>
      :
      null;

    return (
      <div className="login-signup">
        <form onSubmit={this.handleSubmit} className="login-signup-formbox">
        <div onClick={this.props.closeModal} className="close-x">X</div>
        Sign Up
        {this.renderErrors()}
          <div className="login-signup-box">
              {preview}
              <input className="img-attach-input" onChange={this.handleFile} type="file"/>

              <input className="login-signup-contentbox" type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email Address"
                />

              <input className="login-signup-contentbox" type="name"
                value={this.state.name}
                onChange={this.update('name')}
                placeholder="Name"
                />

              <input className="login-signup-contentbox" type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Create Password"
                />

              <input className="login-signup-submit-button" type="submit" value="Sign up" />
            <div className="to-signup">Already have an localhost account? <strong className="to-login-signup-modal" onClick={this.openModal}>Log in</strong></div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);

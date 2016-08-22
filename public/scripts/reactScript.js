import React, { Component } from 'react';
import banner from './banner.svg';
import './App.css';

class App extends Component {
  static propTypes = {
    history: React.PropTypes.array,
  };

  render() {
    // const { props } = this;
    return (
      <div
      className="App"
      >
      <p
      className="App-intro"
      >
      Welcome to Feline & Friends Finder
      </p>
      <p
      className="App-description"
      >
      Post a picture of your lost pet along with your email and location so our community can help you locate them!
      </p>

      <div
      className="App-form"
      >

      <form
      method="post"
      className="form-horizontal"
      id="newCatForm"
      onSubmit={this.handleSubmit}
      >

      <ul
      className="formStyle1"
      >

      <li>
      <a
      href="#"
      id="galBtn"
      className="searchLost"
      >
      Search All Lost Pets
      </a>
      </li>
      <br>
      </br>
      <li>
      <span
      className="divideText"
      >
      OR ENTER:
      </span>
      </li>

      <li>
      <label
      className="firstClass"
      >
      Pet Name
      <span
      className="required"
      >
      *
      </span>
      </label>
      <input
      id="petName"
      type="text"
      name="petName"
      className="fieldLong"
      placeholder="Pet Name"
      />
      &nbsp;
      </li>

      <li>
      <label className="emailClass">
      Owners Email
      <span
      className="required"
      >
      *
      </span>
      </label>
      <input
      id="email"
      type="text"
      name="email"
      className="fieldLong"
      placeholder="example@example.com"
      />
      </li>

      <li>
      <label className="locationClass">
      Location Last Seen
      <span
      className="required"
      >
      *
      </span>
      </label>
      <input
      type="text"
      name="locationLastSeen"
      id="locationLastSeen"
      className="fieldLong fieldTextArea"
      placeholder="Location Last Seen"
      >
      </input>
      </li>

      <li>
      <label className="dateClass">
      Date Last Seen
      <span
      className="required"
      >
      *
      </span>
      </label>
      <input
      type="text"
      name="dateLastSeen"
      id="dateLastSeen"
      className="fieldLong fieldTextArea"
      placeholder="Date Last Seen"
      >
      </input>
      </li>

      <li>
      <label className="pictureClass">
      Picture URL
      <span
      className="required"
      >
      *
      </span>
      </label>
      <input
      id="pictureUrl"
      type="text"
      name="pictureUrl"
      className="fieldPhoto"
      placeholder="http://www.dogz.com/my-cute-pup.jpg"
      />
      </li>

      <li>
      <input
      id="submit"
      type="submit"
      value="Add Your Pet"
      >
      </input>
      </li>
      </ul>
      </form>
      </div>

      <div
      className="App-header"
      >
      <img
      src={banner}
      className="banner"
      alt="banner"
      />
      </div>
      </div>
    );
  }
}

export default App;

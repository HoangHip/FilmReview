import React, { Component }  from 'react';
import './App.css';
import axios from 'axios';
// import config from './config';

import NavBar from './components/NavBar';
import Router from './Router';

class App extends Component {
  state = {
    user: null,
  }

  componentDidMount(){
    axios({
      url: 'http://localhost:6969/api/auth/check',
      method: 'GET',
      withCredentials: true, // mặc định là false nó sẽ không gửi cookie lên network 
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }
  render() {
    return (
      <div>
        <NavBar/>
        <Router/>
      </div>
    );
  }
}

export default App;

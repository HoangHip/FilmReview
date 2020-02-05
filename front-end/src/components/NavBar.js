import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Input,
  Col,
  Row,} from 'reactstrap';
import axios from 'axios';



export default class NavBar extends Component {
  state = {
    isOpen: false,
    username : '',
  }

  toggle = () =>{
    this.setState({ isOpen: !this.state.isOpen});
  }
 
  componentDidMount() {
    axios({
      url: 'http://localhost:6969/api/auth/check',
      method: 'GET',
      withCredentials: true, // mặc định là false nó sẽ không gửi cookie lên network 
    }).then(response => {
      this.setState({username : response.data.data.username})
    }).catch(error => {
      console.log(error);
    })
  }

  logOut = () => {
    axios({
      url: 'http://localhost:6969/api/auth/logout',
      method: 'GET',
      withCredentials: true, // mặc định là false nó sẽ không gửi cookie lên network 
    }).then(response => {
      window.location.href = "/";
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    const { isOpen } = this.state.isOpen;

    return (
      <div>
        <Navbar color="#ffffff" light expand="md">
        <Container>
          <Row style= {{width : "100%"}}>
            <Col md="5"><p></p></Col>
            <Col className="text-center" md="2">
              <NavbarBrand href="/">RA RẠP COI GÌ</NavbarBrand>
            </Col>
            <Col md="3">
              <Input/>
            </Col>
            <Col md="2">
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  { !this.state.username ? (
                    <NavItem>
                      <NavLink href="/login">Login</NavLink>
                    </NavItem>) : (
                      <div>
                        <NavItem>
                          <NavLink href="/">{this.state.username}</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/" onClick={this.logOut}>Logout</NavLink>
                        </NavItem>
                      </div>
                    )
                  }
                </Nav>
              </Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
      )
  }  
}

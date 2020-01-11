
import React, { Component , Fragment } from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';
import Slider from 'react-slick';
import {Container} from 'reactstrap';
import ReactPlayer from 'react-player';


export default class CenterMode extends Component {
  state = { 
    listTrailer: [],
    visible: false 
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    axios(
        {
            url: "http://localhost:6969/api/films",
            method: "GET"
        }
    ).then(data => {
        this.setState({ listTrailer : data.data.data});
    }).catch(error => {
        console.log("Error", error)
    })
  }

  renderListTrailer = () => {
    const { listTrailer } = this.state

    return listTrailer.map(film => {
        return (
            <div>
              <img  alt="" src={film.image} className="trailer-img rounded"/>
              <Button type="primary" onClick={this.showModal}>
                Open Modal
              </Button>
              <Modal
                
                title="Basic Modal"
                visible={this.state.visible}
                onCancel={this.handleCancel}
              >
                <ReactPlayer url={film.link} />
              </Modal>
            </div>
        );
    });
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      arrow: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5
    };
    return (
        <Container>
            <Slider {...settings}>
                {this.renderListTrailer()}
            </Slider>
        </Container>
    )
  }
}

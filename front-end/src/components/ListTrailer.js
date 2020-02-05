import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import {
    Container,
    CardHeader,
    Card} from 'reactstrap';

export default class ListTrailer extends Component {
    state = {
        listTrailer: [],
    }
    
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
                    {/* <h3>{film.link}</h3> */}
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
                <Card className="mb-3" style={{marginTop:"20px"}}>
                    <CardHeader className="bg-light">
                        <div className="card-header-title">
                            Trailer
                        </div>
                    </CardHeader>
                </Card>
                    <Slider {...settings}>
                        {this.renderListTrailer()}
                    </Slider>
            </Container>
        )
    }
};

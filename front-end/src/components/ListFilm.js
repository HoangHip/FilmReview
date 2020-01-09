import React, { Component } from 'react';
import axios from 'axios';
import {
    Row,
    Col,
  CardBody,
  CardTitle, CardSubtitle, Button} from 'reactstrap';


export default class ListFilm extends Component {
    state = {
        listFilm: [],
    }
    
    // componentWillMount() {
    //     console.log("Willmount")
    // }

    componentDidMount() {
        console.log("Didmount");
        axios(
            {
                url: "http://localhost:6969/api/films",
                method: "GET"
            }
        ).then(data => {
            this.setState({ listFilm: data.data.data });
        }).catch(error => {
            console.log("Error", error)
        })
    }
    
    renderListFilm = () => {
        const { listFilm } = this.state;

        return listFilm.map(film => {
            return (
                <Row className="list-film">
                    <Col sm="4" style={{ height: "200px"}}>
                        <a href={"/film/" + film._id}>
                            <img  alt="" src={film.image} className="avatar-img rounded"/>
                        </a>
                    </Col>
                    <Col className="film-content">
                        <a href={"/film/" + film._id}>
                            <CardTitle className="film-name">{film.name}</CardTitle>
                        </a>
                            <CardSubtitle style={{ 
                                color:"#F44336",

                             }}>
                                <span >View: {film.active.views} </span>
                                <span>Thể loại: {film.genre}</span>
                            </CardSubtitle>
                                <span>Votes: {film.active.votes} </span>
                            {/* <time >Date: {film.createdAt} </time> */}
                            <p className="text-muted mt-2 mb-0 small d-none d-sm-block">{film.content}</p>
                        <a href={"/film/" + film._id}>
                            <Button outline color="primary">Xem thêm</Button>
                        </a>
                    </Col>
                </Row>
            );
        });
    };

    render() {
        console.log("render")
        return (
            <CardBody>
                <div>
                    {this.renderListFilm()}
                </div>
            </CardBody>
        )
    }
}

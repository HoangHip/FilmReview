import React, { Component} from 'react';
import { 
    Container,
    Row,
    Col,CardHeader,
    Card} from 'reactstrap';

import ListFilm from '../components/ListFilm';
import ListTrailer from '../components/ListTrailer'

export default class Home extends Component {
    
    render() {
        return (
            <div>
                <div className="banner">
                    <Container>
                        <div className="text-center">
                            <h1 className="text-white">Đánh giá phim</h1>
                        </div>
                    </Container>
                </div>
                <ListTrailer/>
                <Container className="rounded" style={{ 
                    marginTop:"20px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.251)"}}>
                    <Row>
                        <Col>
                            <Card className="mb-3" style={{marginTop:"20px"}}>
                                <CardHeader className="bg-light">
                                    <div className="card-header-title">
                                        Mới nhất
                                    </div>
                                </CardHeader>
                            </Card>
                            <ListFilm/> 
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

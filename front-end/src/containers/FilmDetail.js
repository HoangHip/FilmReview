import React, { Component } from 'react';
import { 
    Container,
    Col,
    Row,} from 'reactstrap';
import axios from 'axios';

export default class FilmDetail extends Component {
    state = {
        post : null
    }

    componentDidMount() {
        const {postId} = this.props.match.params;

        axios({
                url:`http://localhost:6969/api/films/${postId}`,
                method: 'GET',
            }).then(response => {
            const post = response.data.data;

            if (post.active && post.active._id) {
                post.active.views += 1

                axios({
                        url:`http://localhost:6969/api/actives/${post.active._id}`,
                        method: 'PUT',
                        data: post.active
                    }).then(() => {
                        this.setState({ post : post });
                    }).catch(error => {
                        console.log(error)
                    });
            }
        }).catch(error => {
            console.log(error);
        });
    }
    formatDate = (string) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }
    
    render() {
        const { post } = this.state;

        if(!post) {
            return "Loading....";
        }
        return (
            <div>
                <Container className="rounded" style={{
                    marginTop:"20px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.251)"}}>
                    <Row>
                        <Col md="5">
                            <img style={{
                                width: '100%'
                            }} alt="" src={post.image}/>
                        </Col>
                        <Col md="7">
                            <h3>{post.name}</h3>
                            <p>
                                <span>{post.votes} <a href="#">Vote</a> </span> - <span>{post.active.views} view</span>
                            </p>
                            <p>{this.formatDate(post.createdAt)}</p>
                            <p>{post.content}</p>
                            <p>Comment...</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

import React, { Component } from 'react';
import { 
    Container,
    Col,
    Row,
    Input,
    FormGroup,
    Form,
    Button,} from 'reactstrap';
import ReactPlayer from 'react-player';
import axios from 'axios';

export default class FilmDetail extends Component {
    state = {
        post : null,
        vote: [],
        comment:"",
    }

    handleSubmit=(e) => {
        e.preventDefault();
        const {postId} = this.props.match.params;
        
        console.log(this.state.comment)
        console.log(this.state.vote)

        axios({
            url:`http://localhost:6969/api/films/${postId}`,
            method: 'GET',
        }).then(response =>{
            const post = response.data.data;
            if (post.active && post.active._id) {
                post.active.vote = this.state.vote

                axios({
                        url:`http://localhost:6969/api/actives/${post.active._id}`,
                        method: 'PUT',
                        data: post.active
                    }).then(() => {
                        this.setState({ vote : this.state.vote });
                    }).catch(error => {
                        console.log(error)
                    });
            }
        }).catch(error => {
            console.log(error);
        });
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
                        console.log(post)
                        this.setState({ post : post });
                        console.log(post.active)
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

    handleInputChange = (e) => {
        const { value, name } = e.target;

        this.setState({ [name]: value });
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
                        {/* <Col md="12">

                        </Col> */}
                        <Col md="5">
                            <img style={{
                                width: '100%'
                            }} alt="" src={post.image}
                            className="sticky-top"/>
                        </Col>
                        <Col md="7">
                            <hr className="film-heading-hr"/>
                            <h3 className="text-center film-heading-title">{post.name}</h3>
                            <div className="film-trailer">
                                <ReactPlayer url={post.link}  />
                            </div>
                            <p>
                                <span>{post.votes} Vote</span> - <span>{post.active.views} view</span> - <span>{this.formatDate(post.createdAt)}</span>
                            </p>
                            <div id="film-info">
                                <h2 className="panel-heading">
                                    Thông tin phim
                                </h2>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                            </div>
                            <div>
                                <h2 className="panel-heading review-heading">
                                    Bạn có muốn xem ? 
                                </h2>
                                <Form onSubmit={this.handleSubmit} style={{ margin: '50px 0px'}}>
                                    <FormGroup>
                                       <Input type="select" name="vote" id="vote"  onChange={this.handleInputChange}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                        <Input type="textarea" name="comment" id="exampleText" placeholder="Bạn nghĩ gì về phim này ??" onChange={this.handleInputChange} />
                                        <Button></Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

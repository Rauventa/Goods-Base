import React, {Component} from 'react';
import './Edit.scss'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import withRouter from "react-router-dom/es/withRouter";
import axios from "axios";

class Edit extends Component {

    state = {
        check: [],
        warning: ''
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`https://testing-react-8ede1.firebaseio.com/exam_data/${this.props.location.state.selectedGood}.json`);

            const check = response.data;

            this.setState({
                check
            });
        } catch (e) {
            console.log(e)
        }
    }

    nameInputHandler = async (event) => {
        const info = event.target.value;
        if (info.length > 2) {
            this.setState({
                warning: '',
                name: info
            });
        } else {
            this.setState({warning: 'Enter the normal name'})
        }
        try {
            await axios.put(`https://testing-react-8ede1.firebaseio.com/exam_data/${this.props.location.state.selectedGood}/name.json`, info)
        } catch (e) {
            console.log(e)
        }
    };
    categoryInputHandler = async (event) => {
        const info = event.target.value;
        this.setState({
            category: info,
        });
        try {
            await axios.put(`https://testing-react-8ede1.firebaseio.com/exam_data/${this.props.location.state.selectedGood}/category.json`, info)
        } catch (e) {
            console.log(e)
        }
    };
    weightInputHandler = async (event) => {
        const info = event.target.value;
        this.setState({
            weight: info,
        });
        try {
            await axios.put(`https://testing-react-8ede1.firebaseio.com/exam_data/${this.props.location.state.selectedGood}/weight.json`, info)
        } catch (e) {
            console.log(e)
        }
    };
    priceInputHandler = async (event) => {
        const info = event.target.value;
        this.setState({
            price: info,
        });
        try {
            await axios.put(`https://testing-react-8ede1.firebaseio.com/exam_data/${this.props.location.state.selectedGood}/price.json`, info)
        } catch (e) {
            console.log(e)
        }
    };
    countInputHandler = async (event) => {
        const info = event.target.value;
        this.setState({
            count: info,
        });
        try {
            await axios.put(`https://testing-react-8ede1.firebaseio.com/exam_data/${this.props.location.state.selectedGood}/count.json`, info)
        } catch (e) {
            console.log(e)
        }
    };

    updateInfoHandler = async event => {
        event.preventDefault();
        this.props.history.push('/');
        window.location.reload(true);
    };

    render() {
        return (
            <div className="Edit">
                <h1>{this.props.name}</h1>
                <Container>
                    <Row>
                        <Col md={6}>
                            <h1>You can change a good here</h1>
                            <h6>On this page you can change a good's card and push it into you'r base</h6>
                            <small style={{color: '#ff3b3b'}}>{this.state.warning}</small>
                        </Col>
                        <Col md={6}>
                            <Form>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" defaultValue={this.state.check.name} onChange={this.nameInputHandler} />
                                </Form.Group>
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" defaultValue={this.state.check.category} onChange={this.categoryInputHandler} />
                                </Form.Group>
                                <Form.Group controlId="weight">
                                    <Form.Label>Weight</Form.Label> <small style={{color: '#ff3b3b'}}><i>Kg</i></small>
                                    <Form.Control type="number" defaultValue={this.state.check.weight} onChange={this.weightInputHandler} />
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label> <small style={{color: '#ff3b3b'}}><i>$ per piece</i></small>
                                    <Form.Control type="number" defaultValue={this.state.check.price} onChange={this.priceInputHandler} />
                                </Form.Group>
                                <Form.Group controlId="count">
                                    <Form.Label>Count</Form.Label> <small style={{color: '#ff3b3b'}}><i>Pieces</i></small>
                                    <Form.Control type="number" defaultValue={this.state.check.count} onChange={this.countInputHandler} />
                                </Form.Group>
                                {(this.state.name !== '') && (this.state.category !== '') && (this.state.weight !== '') && (this.state.price !== '') && (this.state.count !== '') ?
                                    <Button variant="primary" type="submit" onClick={this.updateInfoHandler}>
                                        Change good's card
                                    </Button>
                                    : <small>Заполните все поля, чтобы продолжить</small>
                                }
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(Edit);
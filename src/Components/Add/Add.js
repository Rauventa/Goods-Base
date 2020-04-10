import React, {Component} from 'react';
import './Add.scss'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from 'axios'

class Add extends Component {

    state = {
        name: '',
        category: '',
        weight: '',
        price: '',
        count: '',
        warning: ''
    };

    //enter the params into the state

    nameInputHandler = (event) => {
        const info = event.target.value;
        if (info.length > 2) {
            this.setState({
                name: info,
                warning: ''
            })
        } else {
            this.setState({warning: 'Enter the normal name'})
        }
    };
    categoryInputHandler = (event) => {
        const info = event.target.value;
        this.setState({
            category: info
        })
    };
    weightInputHandler = (event) => {
        const info = event.target.value;
        this.setState({
            weight: info,
        })
    };
    priceInputHandler = (event) => {
        const info = event.target.value;
        this.setState({
            price: info,
        })
    };
    countInputHandler = (event) => {
        const info = event.target.value;
        this.setState({
            count: info
        })
    };

    //push params into the firebase

    pushInfoHandler = async event => {
        event.preventDefault();
        const weight = parseInt(this.state.weight);
        const price = parseInt(this.state.price);
        const count = parseInt(this.state.count);
        if ((weight && price && count) > 0) {
            try {
                await axios.post('https://testing-react-8ede1.firebaseio.com/exam_data.json', this.state);
                // reload page after POST base query (push)
                window.location.reload(true);
            } catch (e) {
                console.log(e)
            }
        } else {
            this.setState({warning: 'Enter value greater than 0'})
        }
    };

    render() {
        return (
            <div className="Add">
                <Container className="Add">
                    <Row>
                        <Col md={6}>
                            <h1>Add new good here</h1>
                            <h6>On this page you can add a new good's card into you'r base</h6>
                            <small style={{color: '#ff3b3b'}}>{this.state.warning}</small>
                        </Col>
                        <Col md={6}>
                            <Form>
                                <Form.Group controlId="nameInput">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter the name of good" onChange={this.nameInputHandler}/>
                                </Form.Group>
                                <Form.Group controlId="surnameInput">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" placeholder="Enter the category" onChange={this.categoryInputHandler}/>
                                </Form.Group>
                                <Form.Group controlId="telephoneInput">
                                    <Form.Label>Weight</Form.Label> <small style={{color: '#ff3b3b'}}><i>Kg</i></small>
                                    <Form.Control type="number" placeholder="Enter the weight" onChange={this.weightInputHandler}/>
                                </Form.Group>
                                <Form.Group controlId="emailInput">
                                    <Form.Label>Price</Form.Label> <small style={{color: '#ff3b3b'}}><i>npm</i></small>
                                    <Form.Control type="number" placeholder="Enter the price" onChange={this.priceInputHandler}/>
                                </Form.Group>
                                <Form.Group controlId="positionInput">
                                    <Form.Label>Count</Form.Label> <small style={{color: '#ff3b3b'}}><i>Pieces</i></small>
                                    <Form.Control type="number" placeholder="Enter the count" onChange={this.countInputHandler}/>
                                </Form.Group>
                                {(this.state.name !== '') && (this.state.category !== '') && (this.state.weight !== '') && (this.state.price !== '') && (this.state.count !== '') ?
                                    <Button variant="primary" type="submit" onClick={this.pushInfoHandler}>
                                        Add new good
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

export default Add;
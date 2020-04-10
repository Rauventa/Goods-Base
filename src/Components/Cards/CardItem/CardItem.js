import React, {Component} from 'react';
import './CardItem.scss'
import {Button, ListGroup, ListGroupItem, Card} from "react-bootstrap";
import axios from 'axios'
class CardItem extends Component {

    state = {
        counter: this.props.good.count,
        warning: ''
    };

    deleteItemHandler = async () => {
        try {
            await axios.delete(`https://testing-react-8ede1.firebaseio.com/exam_data/${this.props.good.id}.json`);
            window.location.reload(true);
        } catch (e) {
            console.log(e)
        }
    };

    plusCounterHandler = async () => {
        const counter = parseInt(this.state.counter) + 1;
        this.setState({
            counter,
            warning: ''
        });
        try {
            await axios.put(`https://testing-react-8ede1.firebaseio.com/exam_data/${this.props.good.id}/count.json`, this.state.counter + 1);
        } catch (e) {
            console.log(e)
        }
    };

    minusCounterHandler = async () => {
        if (this.state.counter > 1) {
            const counter = parseInt(this.state.counter) - 1;
            this.setState({
                counter,
                warning: ''
            });
            try {
                await axios.put(`https://testing-react-8ede1.firebaseio.com/exam_data/${this.props.good.id}/count.json`, this.state.counter - 1);
            } catch (e) {
                console.log(e)
            }
        } else {
            this.setState({
                warning: 'Enter value greater than 0'
            })
        }
    };

    render() {
        return (
            <div className="CardItem">
                <Card>
                    <Card.Body>
                        <Card.Title>{this.props.good.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.props.good.category}</Card.Subtitle>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Weight: <b>{this.props.good.weight}</b> <small style={{color: '#ff3b3b'}}><i>Kg</i></small></ListGroupItem>
                        <ListGroupItem>Price: <b>{this.props.good.price}</b> <small style={{color: '#ff3b3b'}}><i>$ per piece</i></small></ListGroupItem>
                        <ListGroupItem>Count: <b>{this.state.counter}</b> <small style={{color: '#ff3b3b'}}><i>Pieces</i></small>
                            <br/>
                            <Button variant="primary" className="count-btn" onClick={this.plusCounterHandler}>+</Button>
                            <Button variant="primary" className="count-btn" onClick={this.minusCounterHandler}>-</Button>
                            <br/>
                            <small style={{color: '#ff3b3b'}}>{this.state.warning}</small>
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Button variant="warning" onClick={this.props.onEdit}>Edit</Button>
                        <Button variant="danger" style={{marginLeft: "20px"}} onClick={this.deleteItemHandler}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CardItem;
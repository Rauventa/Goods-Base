import React, {Component} from 'react';
import './Cards.scss';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from 'axios';
import CardItem from './CardItem/CardItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltUp, faLongArrowAltDown, faTimes } from '@fortawesome/free-solid-svg-icons'

class Cards extends Component {

    state = {
        goods: [],
        term: ''
    };

    async componentDidMount() {
        try {
            const response = await axios.get('https://testing-react-8ede1.firebaseio.com/exam_data.json');
            console.log(Object.entries(response.data));

            const goods = Object.entries(response.data).map((good) => {
                return {
                    ...good[1],
                    id: good[0]
                }
            });
            this.setState({
                goods
            });
            console.log(this.state.goods)
        } catch (e) {
            console.log(e)
        }
    }

    //Обращения для того чтобы забрать значение из input в компоненте Search
    onSearchHandler = event => {
        this.setState({
            term: event.target.value
        })
    };

    //Проверка на поиск
    searchingFor = term => {
        return function(x) {
            return (x.name.toLowerCase()).includes(term.toLowerCase()) || !term
        }
    };

    //Sorting

    sortByPriceUpHandler = (event) => {
        event.preventDefault();
        const goods = this.state.goods;
        goods.sort(function(a,b ) {
            return a.price - b.price
        });
        this.setState({goods});
    };

    sortByPriceDownHandler = (event) => {
        event.preventDefault();
        const goods = this.state.goods;
        goods.sort(function(a,b ) {
            return a.price - b.price
        });
        goods.reverse();
        this.setState({goods});
    };

    sortByWeightUpHandler = (event) => {
        event.preventDefault();
        const goods = this.state.goods;
        goods.sort(function(a,b ) {
            return a.weight - b.weight
        });
        this.setState({goods});
    };

    sortByWeightDownHandler = (event) => {
        event.preventDefault();
        const goods = this.state.goods;
        goods.sort(function(a,b ) {
            return a.weight - b.weight
        });
        goods.reverse();
        this.setState({goods});
    };

    render() {
        return (
            <div className="Cards">

                <Container>
                    <Row>
                        <Button variant="primary" onClick={this.sortByPriceUpHandler}>Sort by price <FontAwesomeIcon icon={faLongArrowAltUp} /></Button>
                        <Button variant="primary" onClick={this.sortByPriceDownHandler}>Sort by price <FontAwesomeIcon icon={faLongArrowAltDown} /></Button>
                        <Button variant="primary" onClick={this.sortByWeightUpHandler}>Sort by weight <FontAwesomeIcon icon={faLongArrowAltUp} /></Button>
                        <Button variant="primary" onClick={this.sortByWeightDownHandler}>Sort by weight <FontAwesomeIcon icon={faLongArrowAltDown} /></Button>
                        <Button variant="primary"><FontAwesomeIcon icon={faTimes} /></Button>

                        <Form.Control type="email" placeholder="Enter name for search" onChange={this.onSearchHandler}/>
                    </Row>
                </Container>
                <hr/>
                <Container>
                    <Row>
                        {this.state.goods.filter(this.searchingFor(this.state.term)).map((good, index) => {
                            return (
                                <Col md={3} key={index}>
                                    <CardItem
                                        good={good}
                                        onEdit={() => this.props.onEdit(good)}
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>

            </div>
        );
    }
}

export default Cards;
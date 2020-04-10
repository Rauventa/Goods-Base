import React, {Component} from 'react';
import './Main.scss';
import {Switch, Route} from 'react-router-dom'
import Information from "../../Information/Information";
import Add from "../../Add/Add";
import Cards from "../../Cards/Cards";
import Edit from "../../Edit/Edit";
import withRouter from "react-router-dom/es/withRouter";

class Main extends Component {

    state = {
        selectedGood: null
    };

    onEditHandler = (a) => {
        this.setState(() => ({
            selectedGood: a.id
        }), () => {
            this.props.history.push('/edit', this.state);
        });
        console.log(a);
    };

    render() {
        return (
            <Switch>
                <Route path="/" exact>
                    <Cards
                        onEdit={this.onEditHandler}
                    />
                </Route>
                <Route path="/add">
                    <Add />
                </Route>
                <Route path="/info">
                    <Information />
                </Route>
                <Route path="/edit">
                    <Edit />
                </Route>
            </Switch>
        );
    }
}

export default withRouter(Main);
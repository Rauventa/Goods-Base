import React, {Component} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Components/HOC/Layout/Layout";
import Main from "./Components/HOC/Main/Main";

class App extends Component {
    render() {
        return (
            <Layout>
                <Main />
            </Layout>
        );
    }
}

export default App;
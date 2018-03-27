import * as React from 'react';
import './App.css';
import { PassiveTree } from './components/passive-tree/PassiveTree';
import { Character } from './model/Character';
import DevTools from 'mobx-react-devtools';

// const logo = require('./logo.svg');

class App extends React.Component {
    private character = new Character();

    render() {
        return (
            <div>
                <PassiveTree character={this.character}/>
                <DevTools/>
            </div>
        );
    }
}

export default App;

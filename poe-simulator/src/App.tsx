import * as React from 'react';
import './App.css';
import { PassiveTree } from './components/passive-tree/PassiveTree';
import { Character } from './model/Character';
import DevTools from 'mobx-react-devtools';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs } from './components/tabs/Tabs';
import { Tab } from './components/tabs/Tab';


class App extends React.Component {
    private character = new Character();

    render() {
        return [
            <nav key="nav" className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">PoE Simulator</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="#">Sign out</a>
                    </li>
                </ul>
            </nav>,
            <div key="body" className="container-fluid" role="main">
                <Tabs>
                    <Tab title="Passives">
                        <PassiveTree character={this.character}/>
                    </Tab>
                    <Tab title="Gear">
                        Gear
                    </Tab>
                </Tabs>
                {/*<DevTools/>*/}
            </div>
        ];
    }
}

export default App;

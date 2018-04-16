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
        return (
            <div>
                <Tabs>
                    <Tab title="Passives">
                        <PassiveTree character={this.character}/>
                    </Tab>
                    <Tab title="Gear">
                        Gear
                    </Tab>
                </Tabs>
                <DevTools/>
            </div>
        );
    }
}

export default App;

import * as React from 'react';
import { Character } from './model/Character';
import './App.css';
import { PassiveTree } from './components/passive-tree/PassiveTree';

// import 'font-awesome/css/font-awesome.css';


class App extends React.Component {
    private character = new Character();

    render() {
        return [
            <nav key="navbar" className="navbar is-fixed-top is-primary">
                {/*Brand*/}
                <div className="navbar-brand">
                    <a className="navbar-item brand-text" href="#">Path of Exile</a>
                    <div className="navbar-burger burger" data-target="navMenu">
                        <span/>
                        <span/>
                        <span/>
                    </div>
                </div>

                <div id="navMenu" className="navbar-menu">
                    {/*Left nav*/}
                    <div className="navbar-start">
                        <a className="navbar-item is-active" href="#">
                                <span className="icon">
                                    <i className="fas fa-tree"/>
                                </span>
                            <span>Passive Tree</span>
                        </a>
                        <a className="navbar-item" href="#">
                                <span className="icon">
                                    <i className="fas fa-cogs"/>
                                </span>
                            <span>Gear</span>
                        </a>
                    </div>

                    {/*Right nav*/}
                    <div className="navbar-end">
                        <a className="navbar-item">
                                <span className="icon">
                                    <i className="fas fa-sign-out-alt"/>
                                </span>
                            <span>Sign out</span>
                        </a>
                    </div>
                </div>
            </nav>,
            <div key="body" className="columns is-marginless is-maximized is-gapless">
                <div className="column is-2">
                    <aside className="menu">
                        <p className="menu-label">
                            General
                        </p>
                        <ul className="menu-list">
                            <li><a className="is-active">Dashboard</a></li>
                        </ul>
                    </aside>
                </div>
                <div className="column is-10 is-maximized">
                    <PassiveTree/>
                </div>
            </div>
        ];
    }
}

export default App;

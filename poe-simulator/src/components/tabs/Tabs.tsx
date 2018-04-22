import * as React from 'react';
import { ReactText } from 'react';
import { Tab } from './Tab';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import Nav from 'reactstrap/lib/Nav';
import TabContent from 'reactstrap/lib/TabContent';
import TabPane from 'reactstrap/lib/TabPane';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import * as classnames from 'classnames';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import './tabs.css';

@observer
export class Tabs extends React.Component {
    @observable activeTab: number = 0;

    private toggle(tab: number) {
        this.activeTab = tab;
    }

    private getNavItems() {
        const {children} = this.props;

        return React.Children.map(children, (child, i) => {
            if (typeof child === 'string' || typeof child === 'number' || child.type !== Tab) {
                return null;
            }
            const {title} = child.props;
            return (
                <NavItem>
                    <NavLink
                        onClick={() => this.toggle(i)}
                        className={classnames({active: this.activeTab === i})}
                    >
                        {title}
                    </NavLink>
                </NavItem>
            )
        });
    }

    private getTabContents() {
        const {children} = this.props;

        return React.Children.map(children, (child, i) => {
            if (typeof child === 'string' || typeof child === 'number' || child.type !== Tab) {
                return null;
            }
            return (
                <TabPane tabId={i}>
                    {child}
                </TabPane>
            )
        });
    }

    render() {
        const navItems = this.getNavItems();
        const panes = this.getTabContents();
        return [
            <Nav key="nav" tabs={true}>
                {navItems}
            </Nav>,
            <TabContent key="content" className="TabContent" activeTab={this.activeTab}>
                {panes}
            </TabContent>
        ];
    }
}
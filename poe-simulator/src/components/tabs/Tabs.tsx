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
                    <Row>
                        <Col sm={12}>
                            {child}
                        </Col>
                    </Row>
                </TabPane>
            )
        });
    }

    render() {
        const navItems = this.getNavItems();
        const panes = this.getTabContents();
        return (
            <div>
                <Nav tabs={true}>
                    {navItems}
                </Nav>
                <TabContent activeTab={this.activeTab}>
                    {panes}
                </TabContent>
            </div>
        );
    }
}
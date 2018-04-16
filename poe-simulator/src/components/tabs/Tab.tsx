import * as React from 'react';

export interface TabProps {
    title: string;
}

export class Tab extends React.Component<TabProps> {
    render() {
        const {children} = this.props;
        return children;
    }
}
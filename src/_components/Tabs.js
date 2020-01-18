import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    onClickTabItem = (tab) => {
        this.setState({activeTab: tab});
    };

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;

        return (
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block text-white sidebar nav-black">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item" id={"side_nav"}>
                                    {children.map((child) => {
                                        const {label} = child.props;
                                        return (
                                            <Tab
                                                activeTab={activeTab}
                                                key={label}
                                                label={label}
                                                onClick={onClickTabItem}
                                            />
                                        );
                                    })}
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            {children.map((child) => {
                                if (child.props.label !== activeTab) return undefined;
                                return child.props.children;
                            })}
                        <canvas className="my-4 w-100" id="myChart" width="900" height="380"/>
                    </main>
                </div>
            </div>
        );
    }
}

export default Tabs;


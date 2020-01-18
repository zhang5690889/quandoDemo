import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    };

    render() {
        const {
            onClick,
            props: {
                activeTab,
                label,
            },
        } = this;

        let className = 'nav-link';

        if (activeTab === label) {
            className += ' active';
        }

        return (
            <a className={className}
                onClick={onClick} href={"#"}>{label}</a>
        );
    }
}


export default Tab;

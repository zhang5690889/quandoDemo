import React from 'react';
import {connect} from 'react-redux';
import {AnonymousHomePage} from './AnonymouseHome'

class HomePage extends React.Component {
    render() {
        const {user} = this.props;
        return (
            <div>
                 <AnonymousHomePage user={user}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};

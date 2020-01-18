import React from 'react';

export class DemoWarningBar extends React.Component {
    render() {
        return (
            <div className="alert alert-danger" role="alert" style={{textAlign: "center", fontWeight: "bold"}}>
                You are in Demo Mode
            </div>
        );
    }
}




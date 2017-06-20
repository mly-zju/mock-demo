import React from 'react'

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {msg: []};
        this.getMessage = this.getMessage.bind(this);
    }
    getMessage() {
        let self = this;
        fetch('/api/test/index').then(function (res) {
            return res.json();
        }).then(function (data) {
            self.setState({
                msg: data
            });
        });
    }
    componentDidMount() {
        this.getMessage();
    }
    render() {
        return (
            <ul>
                {this.state.msg.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        );
    }
}

export default Board

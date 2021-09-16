import React, { Component } from 'react';
import './App.css';

class Coin extends React.Component {

    render() {
        const logoStyle = {
            width: "20px",
            height: "20px",
            marginRight: "15px",
            alignItems: "left",
        };

        return (
        <tr>
            <td>{this.props.rank}</td>
            <td><span> <img style={logoStyle} src={this.props.logo} /></span>{this.props.name}</td>
            <td>${this.props.val}</td>
            <td>${this.props.market_cap}</td>
        </tr>
        );
    };
};

export default Coin;

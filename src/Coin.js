import React, { Component } from 'react';
import './App.css';

class Coin extends React.Component {

    render() {

        return (
        <tr>
            <td>{this.props.name}   </td>
            <td>${parseInt(this.props.val).toFixed(2)}</td>
                        {/*<td><button onClick={() => this.props.onClick()}>Buy</button></td>*/}
        </tr>
        );
    };

    }

export default Coin;

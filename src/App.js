import React, { Component, useState, useEffect } from 'react';
import './App.css';
import Coin from "./Coin";


function App() {

const [featuredCoin, setFeaturedCoin] = useState("");
const [stats, setStats] = useState([{
    "currency": "Bitcoin",
    "price": 0,
    },
    {
    "currency": "Ethereum",
    "price": 0
}])

useEffect(() => {
    fetch("https://api.nomics.com/v1/prices?key=" + "9eace6db3d29a8e10f661e838e841ec9f368201d")
    .then(res => res.json())
    .then((data) => setStats(data))
    .catch(console.log)
})

function handleClick(i) {
    setFeaturedCoin(i);
};

function renderCoinInfo(i, p) {
    return <Coin
    name={i}
    val={p}
    onClick={() => handleClick(i)}
    />
};

      return (
        <div>
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1">CryptoCurrency data</span>
            </div>
          </nav>
          <div className="container">
              <div className="row">
                  <div className="col-2">
                  </div>
                  <div className="col-8">
                    <h1>Top Cryptocurrencies: Live Data 📈</h1>
                    <br />
                    <p>Data via <a href="https://nomics.com/">Nomics API</a></p>
                    <h2>{featuredCoin}</h2>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Currency</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                    {stats.map((stat) => (

                    <Coin
                    name={stat["currency"]}
                    val={stat["price"]}
                    onClick={() => handleClick(stat["currency"])}
                    />

                    ))}
                    </table>
                </div>
                <div className="col-2">
                </div>
            </div>
        </div>
        </div>
      );

}

export default App;

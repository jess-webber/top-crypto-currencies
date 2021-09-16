import React, { Component, useState, useEffect } from 'react';
import './App.css';
import Coin from "./Coin";
import logo from "./chart_icon.png";

function App() {

const [featuredCoin, setFeaturedCoin] = useState("");
const [stats, setStats] = useState([{
    "currency": "-",
    "price": "-",
    "rank": 1,
    "market_cap": "-",
    }]);

useEffect(() => {
    fetch("https://api.nomics.com/v1/currencies/ticker?key=" + "9eace6db3d29a8e10f661e838e841ec9f368201d")
    .then(res => res.json())
    .then((data) => {
        const allCoinsArray = [];
        data.forEach(function (arrayItem) {
        allCoinsArray.push([arrayItem["currency"], arrayItem["price"], arrayItem["market_cap"], arrayItem["logo_url"]]);
        });

        //sort coins by market capitalisation
        const sortedCoins = allCoinsArray.sort((a,b) => b[2] - a[2]);
        
        //add extra "rank" number to array for each coin
        var topTenCoins = [];
        for (let i = 0; i < 10; i++) {
        sortedCoins[i].push(i + 1);
        topTenCoins.push(sortedCoins[i])
        };

        //reformat coin and market cap prices
        topTenCoins = topTenCoins.map((x) => {
            var priceItem = parseFloat(x[1]);
            priceItem = Number(priceItem.toFixed(2));
            var marketCapItem = parseFloat(x[2]);
            marketCapItem = Number(marketCapItem.toFixed(2));
            return {
            currency: x[0],
            price: priceItem.toLocaleString(),
            rank: x[4],
            market_cap: marketCapItem.toLocaleString(),
            logo: x[3]
           } 
        });

        //set data as state
        setStats(topTenCoins);
    })
    .catch(console.log)
})

//function renderCoinInfo(i, p) {
    //return <Coin
    //name={i}
    //val={p}
    ///>
//};

const tableStyle = {
    borderRadius: "10px",
    boxShadow: "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
    width: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "50px"
};

const logoStyle = {
    width: "30px",
    height: "30px",
    marginLeft: "5px",
    marginRight: "15px",
    alignItems: "center",
};

      return (
        <div>
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid-flex">
              <span> <img style={logoStyle} src={logo} /></span>
              <span className="navbar-brand mb-0 h1">Crypto Data Live</span>
            </div>
          </nav>
          <div className="container">
              <div className="row">
                  <div className="col-2">
                  </div>
                  <div className="col-8">
                    <h1>🔥 Live cryptocurrency prices:</h1> 
                    <h1>Top 10 by market capitalisation 📈</h1>
                    <br />
                    <p>Data via <a href="https://nomics.com/">Nomics API</a></p>

                    <h2>{featuredCoin}</h2>
                    <table className="table justify-content-center" style={tableStyle}>

                                <th>Rank</th>
                                <th>Currency</th>
                                <th>Price</th>
                                <th>Market Capitalisation</th>

                    {stats.map((stat) => (

                    <Coin
                    rank={stat["rank"]}
                    name={stat["currency"]}
                    val={stat["price"]}
                    market_cap={stat["market_cap"]}
                    logo={stat["logo"]}
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

import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {

  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    axios.get('https://openapiv1.coinstats.app/coins?', {
      headers: { 'X-API-KEY': '7iDcdu+QPMvzE4pe5e1ZIC7w5DL9xlsrQywsQHHUros=' }
    })
      .then(resp => {
        setCurrency(resp.data.result)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <h3> Crypto Currency App</h3>
      <input type="text" placeholder="Search Currency Name" onChange={(e) => setSearch(e.target.value)}></input>
      <table>
        <thead>
          <tr>
            <th>Currency Rank</th>
            <th>Currency Name</th>
            <th>Currency Symbol</th>
            <th>Market Capital </th>
            <th>Current Price</th>
            <th>Supply</th>
            <th>Trading volume</th>
          </tr>
        </thead>
        <tbody>
          {currency
            .filter((val) => {
              return val.name.toLowerCase().includes(search.toLowerCase())
            }).map((val) => {
              return <tr>
                <td className="rank">{val.rank}</td>
                <td>
                  <a href={val.websiteUrl}>
                    <img src={val.icon}></img>
                  </a>
                  <p>{val.name}</p>
                </td>

                <td className="symbol">
                  {val.symbol}
                </td>

                <td>${val.marketCap}</td>
                <td>${val.price.toFixed(2)}</td>
                <td>{val.availableSupply}</td>
                <td>{val.volume.toFixed(0)}</td>
              </tr>
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
import React from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

function App() {
  console.log(web3.version);
  web3.eth.getAccounts().then(console.log);

  const [message, setMessage] = React.useState('')
  const [manager, setManager] = React.useState("");
  const [players, setPlayers] = React.useState([]);
  const [balance, setBalance] = React.useState("");
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    async function getManager() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      setBalance(balance);
      setPlayers(players);
      setManager(manager);
    }
    getManager();
    console.log(manager, balance, players);
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting for transaction to complete...')
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    })
    setMessage('Transaction successfully completed & You Entered the Lottery')
  }

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts()

    setMessage('Waiting for transaction to complete...')
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    })
    setMessage('The Lottery winner has been picked')
  }

  return (
    <div className="App">
      <h1>Lottery Contract</h1>
      <p>
        This contract is manged by {manager}. There are currently{" "}
        {players.length} players. Competeing to win{" "}
        {web3.utils.fromWei(balance, "ether")} ether.
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h4>Ready to Pick a Winner!</h4>
      <button onClick={onClick}>Pick</button>
      <hr />
      <h2>{message}</h2>
    </div>
  );
}

export default App;

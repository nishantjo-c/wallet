import './App.css';
import { generateMnemonic } from "bip39";
import { useState } from 'react';
import SolanaWallet from "../componenets/SolanaWallet.jsx";
import EthereumWallet from '../componenets/EthereumWallet.jsx';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <button onClick={() => {
        const mn = generateMnemonic();
        setMnemonic(mn);
      }}>
        Create Seed Phrase
      </button>
      <h3>{mnemonic}</h3>
      <SolanaWallet mneomonic={mnemonic} />
      <EthereumWallet mnemonic={mnemonic} />
    </>
  )
}

export default App

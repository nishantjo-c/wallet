import { generateMnemonic } from "bip39";
import SolanaWallet from "../componenets/SolanaWallet.jsx";
import EthereumWallet from '../componenets/EthereumWallet.jsx';
import { useState } from 'react';

export default function NewWallet(){
  const [mnemonic, setMnemonic] = useState("");
  return <>
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
}

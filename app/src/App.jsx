import './App.css'
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useState } from 'react';

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
    </>
  )
}

export default App

import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";

export default function SolanaWallet({mneomonic}) {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const [visibility, setVisibility] = useState([]);

  function toggleVisibility(index){
    const visibilityArr = [...visibility];
    visibilityArr[index] = !visibilityArr[index];
    setVisibility([...visibilityArr]);
  }

  return <div>
    <button onClick={() => {
      const seed = mnemonicToSeed(mneomonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, {pub: keypair.publicKey, pvt: keypair.secretKey}]);
      setVisibility([...visibility, false]);
    }}>
      Add a new SOL wallet
    </button>
    {publicKeys.map((key,index) => 
      <>
        <h4 key={index}>{key.pub.toBase58()}</h4>
        <button onClick={() => toggleVisibility(index)}>show private key</button>
        <h4 style={visibility[index] ? {visibility: "visible"} : {visibility: "hidden"} }>{key.pvt}</h4>
      </>
    )}
  </div>
}
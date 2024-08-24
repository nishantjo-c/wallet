import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";

export default function SolanaWallet({mneomonic}) {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const [toggle, setToggle] = useState(0);

  return <div>
    <button onClick={() => {
      const seed = mnemonicToSeed(mneomonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, {pub: keypair.publicKey, pvt: keypair.secretKey}]);
    }}>
      Add a new SOL wallet
    </button>
    {publicKeys.map((key,index) => 
      <>
        <h4 key={index}>{key.pub.toBase58()}</h4>
        <button onClick={() => toggle === 0 ? setToggle(1) : setToggle(0)}>show private key</button>
        <h4 style={toggle === 0 ? {visibility: "hidden"}: {visibility: "visible"} }>{key.pvt}</h4>
      </>
    )}
  </div>
}
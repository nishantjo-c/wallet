import { Wallet, HDNodeWallet } from "ethers";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";

export default function EthereumWallet({mnemonic}) {

  const [currentIndex,setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [toggle, setToggle] = useState(0);
  
  return <>
    <button onClick={async () => {
      const seed = await mnemonicToSeed(mnemonic);
      const path = `m/44'/60'/${currentIndex}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(path);
      const privateKey = child.privateKey;
      const wallet = new Wallet(privateKey);
      setCurrentIndex(currentIndex + 1);
      setAddresses([...addresses,{pub: wallet.address, pvt: wallet.privateKey}]);

    }}>
      Add a new Eth wallet
    </button>
    {addresses.map((key,index) => 
      <>
        <h4>{key.pub}</h4>
        <button onClick={() => toggle === 0 ? setToggle(1) : setToggle(0)}>show private key</button>
        <h4 style={toggle === 0 ? {visibility: "hidden"}: {visibility: "visible"} }>{key.pvt}</h4>
      </>
    )}
  </>
}
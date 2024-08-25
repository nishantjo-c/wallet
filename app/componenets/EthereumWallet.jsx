import { Wallet, HDNodeWallet } from "ethers";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";

export default function EthereumWallet({mnemonic}) {

  const [currentIndex,setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [visibility, setVisibility] = useState([]);

  function toggleVisibility(index){
    const visibilityArr = [...visibility];
    visibilityArr[index] = !visibilityArr[index];
    setVisibility([...visibilityArr]);
  }
  
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
      setVisibility([...visibility,false])

    }}>
      Add a new Eth wallet
    </button>
    {addresses.map((key,index) => 
      <>
        <h4>{key.pub}</h4>
        <button onClick={() => toggleVisibility(index)}>show private key</button>
        <h4 style={visibility[index] ? {visibility: "visible"} : {visibility: "hidden"} }>{key.pvt}</h4>
      </>
    )}
  </>
}
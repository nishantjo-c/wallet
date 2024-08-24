const { generateMnemonic, mnemonicToSeedSync } = require("bip39");
const nacl = require("tweetnacl");
const { derivePath } = require("ed25519-hd-key");
const { Keypair } = require("@solana/web3.js");

const mnemonic = generateMnemonic();
const seed = mnemonicToSeedSync(mnemonic);

function createPair(){
  const path = `m/44'/501'/0'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log("public:: ", Keypair.fromSecretKey(secret).publicKey.toBase58());
  console.log("private:: ", secret);
}

createPair()
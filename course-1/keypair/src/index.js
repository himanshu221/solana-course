import { Keypair } from '@solana/web3.js'

const kp = Keypair.generate();

console.log(`public key : ${kp.publicKey.toBase58()}`)
console.log(`private key : ${kp.secretKey}`)

const kpRest = Keypair.fromSecretKey(kp.secretKey)

console.log(kpRest.publicKey.toBase58())
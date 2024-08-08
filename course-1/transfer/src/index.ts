import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    Keypair,
    LAMPORTS_PER_SOL
  } from "@solana/web3.js";
import dotEnv from 'dotenv'
import bs58 from 'bs58'
dotEnv.config()


async function transact(connection: Connection, trans: Transaction, senderKP: any) {
    const signature = await sendAndConfirmTransaction(connection, trans, [senderKP]);
    console.log(
        `💸 Finished! Sent to the address ${senderKP}. `,
      );
      console.log(`Transaction signature is ${signature}!`);
}
async function checkBalance(account: PublicKey, amt: number) {

    const connection  = new Connection("https://api.devnet.solana.com", "confirmed");
    
    const balance = await connection.getBalance(account);
    console.log(`balance : ${balance/LAMPORTS_PER_SOL}`)
    console.log(`amt : ${amt}`)
    if(balance/LAMPORTS_PER_SOL < amt)
    {
        console.error("insufficient balance");
        process.exit(1);
    }
}

async function exec(transferAmount: string, transerPK: any) {

    const secretKeyString = process.env.SECRET_KEY!;
    const secretKey = bs58.decode(secretKeyString);
    const senderKeypair = Keypair.fromSecretKey(secretKey);

    checkBalance(senderKeypair.publicKey, parseFloat(transferAmount));
    
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    
    const transaction  = new Transaction();
    
    const instructions = SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: transerPK,
        lamports: LAMPORTS_PER_SOL * Number(transferAmount)
    })
    
    transaction.add(instructions);
    
    transact(connection, transaction, senderKeypair);
}

const transferAccunt = process.argv[2] || null
const transferAmount = process.argv[3] || null

if(!transferAccunt || !transferAmount){
    console.error("Please provide the transfer account and amount to transfer");
    process.exit(1);
}
let transerPK;  

try{
    transerPK = new PublicKey(transferAccunt);
}catch(e: any){
    console.error("Transfer Account key provided is invalid");
    process.exit(1);
}

exec(transferAmount, transerPK);









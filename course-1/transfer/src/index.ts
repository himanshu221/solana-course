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
dotEnv.config()
// @ts-ignore
import { getKeypairFromEnvironment } from "@solana-developers/helpers";


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
    
    if(balance/LAMPORTS_PER_SOL < amt)
    {
        console.error("insufficient balance");
        process.exit(1);
    }
}

async function exec(transferAmount: string, transerPK: any) {

    const fromKp = getKeypairFromEnvironment("SECRET_KEY")

    checkBalance(fromKp.publicKey, Number(transferAccunt));
    
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    
    const transaction  = new Transaction();
    
    const instructions = SystemProgram.transfer({
        fromPubkey: fromKp.publicKey,
        toPubkey: transerPK,
        lamports: LAMPORTS_PER_SOL * Number(transferAmount)
    })
    
    transaction.add(instructions);
    
    transact(connection, transaction, fromKp);
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









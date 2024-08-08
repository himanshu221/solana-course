import web3 from '@solana/web3.js'
import dotenv from 'dotenv'
import bs58 from 'bs58'
dotenv.config()

const programPK = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const programDataPK = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");
const cluster = "devnet"
const secret_key = process.env.SECRET_KEY!;
const secretArr = bs58.decode(secret_key);
const payer = web3.Keypair.fromSecretKey(secretArr);

const inst = new web3.TransactionInstruction({
    programId: programPK,
    keys: [{
        pubkey: programDataPK,
        isSigner: false,
        isWritable: true
    }]
})

const transaction = new web3.Transaction();
transaction.add(inst);

const connection = new web3.Connection(web3.clusterApiUrl(cluster), "confirmed");

async function execute(transaction: web3.Transaction, connection: web3.Connection, payer: web3.Keypair ){
    const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);
    console.log(`Successfully executed transaction : ${signature}`);
    console.log(`Explore the transaction at :\nhttps://explorer.solana.com/tx/${signature}?cluster=${cluster}`)
}

execute(transaction, connection, payer);

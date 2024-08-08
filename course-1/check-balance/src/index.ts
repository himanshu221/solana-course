import {Connection, PublicKey, LAMPORTS_PER_SOL} from '@solana/web3.js'


async function getBalance(account: string) {
    let pbKey;
    try{
        pbKey  = new PublicKey(account);
    }catch(e: any){
        console.error(e.message)
        return;
    }
    const connection  = new Connection("https://api.devnet.solana.com", "confirmed");
    
    const balance = await connection.getBalance(pbKey);
    
    console.log(`Account balance for ${pbKey} : ${balance/LAMPORTS_PER_SOL}`);
}

getBalance("3A9FPMDLMdkALzqd2ek4dg2op8PptG1V7BgiqEUYua3x")
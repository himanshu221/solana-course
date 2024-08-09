import styles from '../styles/PingButton.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from "@solana/web3.js"
import { useState } from 'react';

export const PingButton = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
	const [signature, setSignature] = useState(null);
    
	const onClick = async () => {
        if(!publicKey || !sendTransaction){
			console.log("Wallet not connected !")
			return;
		}
		
		const programPK = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
		const programDataPK = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");

		const instruction = new web3.TransactionInstruction({
			programId: programPK,
			keys: [{
				pubkey: programDataPK,
				isWritable: true,
				isSigner: false
			}]
		})

		const transaction = new web3.Transaction();
		transaction.add(instruction);

		const sign = await sendTransaction(transaction,connection);
		setSignature(sign);
    }
    
	return (
		<div>
			<div className={styles.buttonContainer}>
				<button className={styles.button} onClick={onClick} >Ping!</button>
				<div className={styles.signature}>
					{signature && `Explore the transaction :\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`}
				</div>
			</div>
		</div>
	)
}


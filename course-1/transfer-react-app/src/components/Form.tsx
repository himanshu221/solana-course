
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';
import { Loader } from './Loader';
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

const schema = z.object({
    account: z.string().length(44),
    amount: z.number()
})
type FormFields = z.infer<typeof schema>

export const Form = () => {
    const {register, handleSubmit, setError ,formState : {errors, isSubmitting}} = useForm<FormFields>({
        resolver: zodResolver(schema)
    });
    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet();
    const [solBalance, setSolBalance] = useState<number>(0);
    const [signature, setSignature] = useState<string>();

    const getBalance = async (publicKey : PublicKey, connection: Connection) => {
        const balance = await connection.getBalance(publicKey, "confirmed");
        setSolBalance(balance/LAMPORTS_PER_SOL); 
    }

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if(!publicKey)
            return;
        console.log(data)
        let receiverPk;
        try{
            receiverPk = new PublicKey(data.account);
            console.log(receiverPk)
        }catch(e: any){
            console.error(e.message)
            setError("root", {
                message: "Invalid public key provided"
            })
            return;
        }

        if(data.amount >= solBalance){
            setError("root", {
                message: "Insufficient funds!!"
            })
            return;
        }

        try{
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            const transaction = new Transaction();
            const instruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: receiverPk,
                lamports: data.amount*LAMPORTS_PER_SOL
            })
            transaction.add(instruction);
            const sign = await sendTransaction(transaction, connection);
            console.log(sign)
            setSignature(sign)
        }catch(e: any){
            console.log(e)
            setError("root", {
                message : "Transaction failed due to an error"
            })
        }
    }

    useEffect(() => {
        if(!publicKey)
            return;
        getBalance(publicKey, connection);
    },[publicKey, connection ])

    return (
            <div className='md:w-[40%] w-[80%] min-w-96 rounded-lg mt-20 shadow-lg bg-slate-200 p-2 text-slate-900'>
                <div className='py-5 px-4 w-full grid grid-cols-5 gap-0 justify-center items-center text-2xl'>
                    <div className='flex justify-center col-span-3 items-center font-extrabold'>SOL Balance</div>
                    <div className='py-2 px-6 bg-slate-400 rounded-lg col-span-2 flex justify-center items-center font-bold'>
                        {publicKey && solBalance != 0 ? solBalance : <span className='text-lg'>Wallet Disconnected</span>}
                    </div>
                </div>
                <div className='px-6'>
                    <form className='text-start my-5' onSubmit={handleSubmit(onSubmit)}>
                        <div className='text-xl font-semibold py-2'>Send SOL to</div>
                        <input {...register("account")} className='mb-2 text-xl p-2 outline-none rounded-lg w-full'/>
                        <div className='text-md text-red-500 font-bold mb-2'>
                            {errors.account && errors.account.message}
                        </div>
                        <div className='text-xl font-semibold py-2'>Amount (in SOL)</div>
                        <input {...register("amount", {valueAsNumber: true})} className='mb-2 text-xl p-2 outline-none rounded-lg w-full'/>
                        <div className='text-md text-red-500 font-bold mb-5'>
                            {errors.amount && errors.amount.message}
                        </div>
                        <div className='w-full text-center'>
                            <button type="submit" disabled={isSubmitting} className="focus:outline-none text-white bg-[#512ca9] hover:bg-[#aa9ef2] focus:ring-1 focus:ring-purple-700 font-bold rounded-lg text-2xl px-5 py-2.5 mb-2 ">{isSubmitting ? <Loader/> : "Send" }</button>
                        </div>
                        <div className='text-center text-md text-red-500 font-bold'>
                            {errors.root && errors.root.message}
                        </div>
                        <div className='w-full text-center text-md text-wrap'>
                            {signature && <span>Explore the transaction in <a target="_blank" className="underline" href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}>Solscan</a></span>}
                        </div>
                    </form>

                </div>
            </div>
    )
}
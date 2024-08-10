
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';

type FormFields = {
    amount: number,
    account: string
}

export const Form = () => {
    const {register, handleSubmit} = useForm<FormFields>();
    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet();
    const [solBalance, setSolBalance] = useState<number>(0);

    const getBalance = async (publicKey : PublicKey, connection: Connection) => {
        const balance = await connection.getBalance(publicKey, "confirmed");
        setSolBalance(balance/LAMPORTS_PER_SOL); 
    }

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data)
    }
    useEffect(() => {
        if(!publicKey)
            return;
        getBalance(publicKey, connection);
    },[publicKey, connection ])
    return (
            <div className='md:w-[40%] w-[80%] h-[60%] rounded-lg mt-20 shadow-lg bg-slate-200 p-2 text-slate-900'>
                <div className='py-5 px-4 w-full grid grid-cols-5 gap-0 justify-center items-center text-2xl'>
                    <div className='flex justify-center col-span-3 items-center font-extrabold'>SOL Balance</div>
                    <div className='py-2 px-6 bg-slate-400 rounded-lg col-span-2 flex justify-center items-center font-bold'>
                        {publicKey && solBalance != 0 ? solBalance : <span className='text-lg'>Wallet Disconnected</span>}
                    </div>
                </div>
                <div className='px-6'>
                    <form className='text-start my-5' onSubmit={handleSubmit(onSubmit)}>
                        <div className='text-xl font-semibold py-2'>Send SOL to</div>
                        <input {...register("account")} className='mb-6 text-xl p-2 outline-none rounded-lg w-full'/>
                        <div className='text-xl font-semibold py-2'>Amount (in SOL)</div>
                        <input {...register("amount")} className='mb-12 text-xl p-2 outline-none rounded-lg w-full'/>
                        <div className='w-full text-center'>
                            <button type="submit" className="focus:outline-none text-white bg-[#512ca9] hover:bg-[#aa9ef2] focus:ring-1 focus:ring-purple-700 font-bold rounded-lg text-2xl px-5 py-2.5 mb-2 ">Send</button>
                        </div>
                    </form>

                </div>
            </div>
    )
}
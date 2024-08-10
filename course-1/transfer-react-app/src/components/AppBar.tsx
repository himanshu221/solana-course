import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"



export const AppBar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-slate-900">
            <div className="py-10 px-10 w-full flex items-center justify-between">
                <div className="w-48">
                    <img src="solanaLogo.png" alt="" />
                </div>
                <div>
                    <WalletMultiButton />
                </div>
            </div>
        </div>
    )
}
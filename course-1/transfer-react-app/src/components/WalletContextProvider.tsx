import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from '@solana/web3.js'
import { useMemo } from "react";
import '@solana/wallet-adapter-react-ui/styles.css';

export const WalletContextProvider = ({children}: {children: React.ReactNode}) => {
    
    const endpoint = web3.clusterApiUrl("devnet");
    const wallets = useMemo(() => [],[]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
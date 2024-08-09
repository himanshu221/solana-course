import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl} from "@solana/web3.js"
import { useMemo } from "react";
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletContextProvider = ({children} : {children: React.ReactNode}) => {

    const endpoint = clusterApiUrl("devnet")
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

export default WalletContextProvider
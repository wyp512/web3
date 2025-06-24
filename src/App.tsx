import { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import './App.css';

function App() {
  const [walletData, setWalletData] = useState<{ address: string; signer: any; chainId: number } | null>(null);

  const handleWalletConnect = (data: { address: string; signer: any; chainId: number }) => {
    setWalletData(data);
  };

  return (
    <div className="hello-web3-app">
      <div className="app-header">
        <h1 className="app-title">MetaMask 连接演示</h1>
        <WalletConnect onConnect={handleWalletConnect} />
      </div>

      <div className="message-container">
        {walletData ? (
          <div className="wallet-connected">
            <h2>钱包已连接!</h2>
            <p>地址: {walletData.address}</p>
            <p>网络ID: {walletData.chainId}</p>
          </div>
        ) : (
          <p className="connect-wallet-text">请连接您的钱包</p>
        )}
      </div>
    </div>
  );
}

export default App;

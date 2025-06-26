import { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import { callGreetFunction } from './utils/contractService';
import './App.css';

function App() {
  const [walletData, setWalletData] = useState<{ address: string; signer: any; chainId: number } | null>(null);
  const [contractResult, setContractResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleWalletConnect = (data: { address: string; signer: any; chainId: number }) => {
    setWalletData(data);
  };

  // 调用智能合约greet函数
  const handleCallContract = async () => {
    if (!walletData?.signer) {
      setError('请先连接钱包');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const result = await callGreetFunction(walletData.signer);
      setContractResult(result);
    } catch (err: any) {
      setError(err.message || '调用智能合约失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hello-web3-app">
      <div className="app-header">
        <div className="title-container">
          <h1 className="app-title">MetaMask 连接演示</h1>
          <div className={`connection-status ${walletData ? 'connected' : 'disconnected'}`}></div>
        </div>
        <WalletConnect onConnect={handleWalletConnect} />
      </div>

      <div className="message-container">
        {walletData ? (
          <div className="wallet-connected">
            <h2>钱包已连接!</h2>
            <p>地址: {walletData.address}</p>
            <p>网络ID: {walletData.chainId}</p>
            
            {/* 智能合约调用区域 */}
            <div className="contract-section">
              <h3>智能合约调用</h3>
              <button 
                onClick={handleCallContract}
                disabled={isLoading}
                className="contract-button"
              >
                {isLoading ? '调用中...' : '调用 greet 函数'}
              </button>
              
              {/* 显示合约调用结果 */}
              {contractResult && (
                <div className="contract-result">
                  <h4>合约返回结果:</h4>
                  <p>{contractResult}</p>
                </div>
              )}
              
              {/* 显示错误信息 */}
              {error && (
                <div className="contract-error">
                  <p style={{ color: 'red' }}>错误: {error}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="connect-wallet-text">请连接您的钱包</p>
        )}
      </div>
    </div>
  );
}

export default App;

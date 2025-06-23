import { useState, useEffect } from 'react';
import { connectWallet, listenToAccountChanges, listenToNetworkChanges } from '../utils/web3';

interface WalletConnectProps {
  onConnect: (walletData: { address: string; signer: any; chainId: number }) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      listenToAccountChanges((newAddress: string) => {
        setAddress(newAddress);
        window.location.reload();
      });

      listenToNetworkChanges((newChainId: number) => {
        setChainId(newChainId);
        window.location.reload();
      });
    }
  }, [address]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const walletData = await connectWallet();
      setAddress(walletData.address);
      setChainId(walletData.chainId);
      onConnect(walletData);
    } catch (err: any) {
      setError(err.message || '连接钱包失败');
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return '以太坊主网';
      case 5:
        return 'Goerli测试网';
      case 11155111:
        return 'Sepolia测试网';
      default:
        return `未知网络 (${chainId})`;
    }
  };

  return (
    <div className="wallet-connect">
      {!address ? (
        <button 
          onClick={handleConnect} 
          disabled={isConnecting}
          className="connect-button"
        >
          {isConnecting ? '连接中...' : '连接MetaMask'}
        </button>
      ) : (
        <div className="wallet-info">
          <span className="address">{formatAddress(address)}</span>
          {chainId && <span className="network">{getNetworkName(chainId)}</span>}
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WalletConnect; 
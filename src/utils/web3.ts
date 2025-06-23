import { ethers } from 'ethers';

// 连接MetaMask
export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("请安装MetaMask!");
    }
    
    // 请求用户连接MetaMask
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    // 获取provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // 获取signer
    const signer = provider.getSigner();
    
    // 获取当前网络
    const network = await provider.getNetwork();
    
    return {
      address: accounts[0],
      signer,
      chainId: network.chainId
    };
  } catch (error) {
    console.error("连接钱包失败:", error);
    throw error;
  }
};

// 监听MetaMask账户变化
export const listenToAccountChanges = (callback: (address: string) => void) => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      callback(accounts[0]);
    });
  }
};

// 监听网络变化
export const listenToNetworkChanges = (callback: (chainId: number) => void) => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', (chainId: string) => {
      callback(parseInt(chainId));
    });
  }
}; 
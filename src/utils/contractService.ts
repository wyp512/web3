import { ethers } from 'ethers';
import { contractAddress, contractAbi } from './contract';

// 调用智能合约的greet函数
export const callGreetFunction = async (signer: ethers.Signer) => {
  try {
    // 检查合约地址是否已配置
    if (!contractAddress) {
      throw new Error('合约地址未配置，请在contract.ts文件中填写合约地址');
    }

    // 定义provider变量
    const provider = signer.provider;
    if (!provider) {
      throw new Error('无法获取provider');
    }

    // 创建合约对象，传入合约地址、合约ABI和provider签名对象
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    // 调用智能合约的greet函数
    const result = await contract.greet();
    
    console.log('合约调用结果:', result);
    return result;
  } catch (error) {
    console.error('调用智能合约失败:', error);
    throw error;
  }
}; 
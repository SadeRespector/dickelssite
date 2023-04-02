import {
  useAddress,
  useDisconnect,
  useMetamask,
  useToken,
  useTokenBalance,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { Header } from "./Header";
import "./styles/Header.css";

export default function Home() {
  // Hooks to connect to the user's MetaMask Wallet and view their address
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  let contractAddress = "0xB3Ee837af8F89cf21217C695366993D091397ce3";
  // Connect to the token smart contract
  const token = useToken(contractAddress); // your token contract address here

  const { contract } = useContract(contractAddress);
  const { data, isLoading} = useContractRead(contract, "name");
  const { data: allowance, isLoading: allowanceLoading, error  } = useContractRead(
    contract, 
    "allowance", 
    "0x5fda8baa7d5e9404fe72166c9a767bb875b0efab",
    address
  );

  const { data: tokenBalance } = useTokenBalance(token, address);

  const { mutateAsync, writeLoading, writeError } = useContractWrite(contract, "transferFrom");
  
  const transferDickels = () => {
    mutateAsync(["0x5fda8baa7d5e9404fe72166c9a767bb875b0efab", address, allowance]);
   }
 

  return (
    <div className="bg-robots"> 
      <div>
        <Header />
      </div>
    <div >
      {address ? (
        <>
        <div className='flex justify-center'>
          {/* <button className='flex justify-center' onClick={disconnectWallet}>Disconnect Wallet</button> */}
          <button onClick={disconnectWallet} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Disconnect Wallet
  </span>
</button>
          </div>
          <div className="flex justify-center">
          <p  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
  Your address: {address}
  </span>
  </p>
          </div>
          <div className="flex justify-center">
          <p  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
  Your balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}  <br/>
  </span>
  </p>
          </div>
          <div className="flex justify-center">
          <p  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
  <div className='flex justify-center'>{isLoading ? <p>Loading...</p> : <p>Contract Name: {data}</p>}</div>
  </span>
  </p>
          </div>
          <div className="flex justify-center">
          <p  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
  <div className='flex justify-center'>{allowanceLoading ? <p>Loading...</p> : <p>Allowance: {allowance.toNumber()}</p>}</div>
  </span>
  </p>
          </div>
          <div className="flex justify-center">
          <p  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
  <div className='flex justify-center'>
          <button  onClick={transferDickels}>Get Dickels</button>
          </div>
  </span>
  </p>
          </div>
          
          
          
        </>
      ) : (
        <div className='flex justify-center'>
        
        <button onClick={connectWithMetamask} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Connect Wallet
  </span>
</button>
        </div>                
      )}
      <div className="flex justify-center">
          <p  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
  <div className='flex justify-center'>
  0x7654Cd0171B7c3a6C8504795810f221a20C3Dc3f is the official Dickels address. Any other coin is a scam coin. If you know how to style these types of pages, please DM me.    

          </div>
  </span>
  </p>
          </div>
    </div>
    </div>
  );
}

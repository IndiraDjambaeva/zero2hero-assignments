import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Contract, providers, ethers, errors } from "ethers";
import { useState, useEffect, useRef } from 'react';
import Web3Modal from "web3modal"
import { NFT_CONTRACT_ADDRESS, ab
 } from '@/constants';
import NFTs from "./NFTs";
import NFTList from "./NFTList";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [nfts, setNfts] = useState(0);

  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    
    const { chainId } = await web3Provider.getNetwork();
    if(chainId !== 97){
      window.alert("Change to BNBchain testnet");
    }
    if (needSigner){
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const safeMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      console.log(signer);
      const nftContract = new Contract (NFT_CONTRACT_ADDRESS, abi, signer);
      
      const tx = await nftContract.safeMint(signer.getAddress(), {
        value: ethers.utils.parseEther("0.001")
      });
      console.log(tx);
        
    } catch (error) {
      console.error(error);
    }
  };

  const getNFTs = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract (NFT_CONTRACT_ADDRESS, abi, signer);
      
      const nftBalance = Number(await nftContract.balanceOf(await signer.getAddress())
      ); 
      /*if (nftBalance) {
      setNfts(nftBalance);
      }  */
      let tempNftArray = [];
      for (let index = 0; index < 100000; index++) {
        try {
          const tokenURI = await nftContract.tokenURI(index);
          if (tokenURI) {
            tempNftArray.push(tokenURI);
          }
    } catch (error) {
      break;
    }
  }
  console.log(tempNftArray);

  let processedNftArray = [];

      tempNftArray.map(async (e) => {
        if (e.includes("ipfs")) {
          e = "https://gateway.pinata.cloud/ipfs/".concat(e.slice(7));
        }
        const response = await fetch(e);
        const json = await response.json();
        if (json.image.includes("ipfs")) {
          json.image = "https://gateway.pinata.cloud/ipfs/".concat(
            json.image.slice(7)
          );
        }
        processedNftArray.push(json);
        console.log(JSON.stringify(json));
      });
      console.log("preprocessed NFTs metadta:", processedNftArray);

      setNfts(processedNftArray);
      displayNFTs();
    } catch (error) {
      console.error(error);
    }
  };

  const displayNFTs = () => {
    console.log(nfts.length);
    if (true) {
      return (
        <>
          <div>
            <div></div>
            {getNFTs}
            <button onClick={getNFTs}>get NFTs</button>
          </div>

          {Array.isArray(nfts) && nfts.map((e) => {
            return (
              <>
                {<img src={e.image} width={200} />}
                <br />
                <span>Name: {e.name}, </span>
                <br />
                <span>Description: {e.description}</span>
                <br />
              </>
            );
          })}
        </>
      );
    }
  };




const connectWallet = async() => {
  try {
    await getProviderOrSigner();
    setWalletConnected(true);
  } catch (error) {
    console.error(error);
  }
}

const renderButton = () => {
  if (walletConnected) {
    return (
      <div>
        <div>You can mint NFT:</div>
        <button className={styles.button} onClick={safeMint}>Mint</button>
      </div>
    );

  } else {
    return (
      <button onClick={connectWallet} className="button">
        Connect Wallet
      </button>
    );
  }
};

useEffect(() => {
  displayNFTs();
}, [nfts]);


  useEffect(() => {
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network: 97,
        providerOptions: {},
        disableInjectedProvider: false
      });
      connectWallet();
      getNFTs();
      
    }
  }, [walletConnected]);

  return (
    <>
      <h>NFT dapp</h>
      <br />
      {renderButton()}

      <p>All NFTs:</p>
      {displayNFTs()}
    </>
  );
}
  /*return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Basic React dApp
          </p>
          <div>
            <button onClick={connectWallet
            } className={styles.button}>
              {!walletConnected ? "Connect Wallet": "disconnect"}
            </button>
          </div>
        </div>
        <div>
          <h1>NFT dapp</h1>
          <br />
          {renderButton()}
          <p>Your number of nfts: {nfts}</p>
        </div>
      </main>
    </>
  );
}*/

import { useState, useContext } from "react";
import { NftCard } from "./marketplaceIndex";
import { fetchNFTs } from "../utils/fetchNFTs";
import Style from "./marketplaceExplore.module.css";
import { HashLoader } from "react-spinners";
import { Context } from "../context/Context";
import Web3 from "web3";
import { ethers } from "ethers";
import MarketPlaceAbi from "../sc/abi/MarketPlace.json";

const MarketplaceExplore = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [NFTs, setNFTs] = useState();

  const { walletAddress } = useContext(Context);
  // console.log(walletAddress);
  const MarketPlace_SmartContract =
  "0xf18609EeAa8832A35ba26B161a176E8fa86D0C49";
  const data = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const marketplace= new ethers.Contract(MarketPlace_SmartContract,MarketPlaceAbi,signer);
      const selltx=await marketplace.fetchMarketItems();
    console.log("selltx", selltx);
    fetchNFTs("0xf18609EeAa8832A35ba26B161a176E8fa86D0C49", contractAddress, setNFTs);
  };

  console.log(NFTs);
  return (
    <div>
      <div className={Style.ExploreContainer_card_map}>
        <button onClick={() => data()}>Load</button>
        {NFTs ? (
          <NftCard NFT={NFTs} />
        ) : (
          <div className={Style.ExploreContainer_noNFT}>
            <HashLoader color="rgba(76, 87, 115, 1)" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceExplore;

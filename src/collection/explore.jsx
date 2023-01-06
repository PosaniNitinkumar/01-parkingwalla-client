import { useState, useContext, useEffect } from "react";
import { NftCard } from "./collectionIndex";
import { fetchNFTs } from "../utils/fetchNFTs";
import Style from "./explore.module.css";
import { HashLoader } from "react-spinners";
import { Context } from "../context/Context";

const Explore = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [NFTs, setNFTs] = useState();

  const { walletAddress } = useContext(Context);
  // console.log(walletAddress);
  const data = () => {
    fetchNFTs(walletAddress, contractAddress, setNFTs);
  };



console.log(NFTs)
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

export default Explore;

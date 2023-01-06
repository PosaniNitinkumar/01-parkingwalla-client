import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Web3 from "web3";
import { ethers } from "ethers";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import { Button, LikeProfile } from "../../components/componentsindex";
import MarketPlaceAbi from "../../sc/abi/MarketPlace.json";
import { parseEther } from "ethers/lib/utils";

const NftCard = ({ NFT }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(0);
  console.log("NFT", NFT);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(likeInc + 1);
    } else {
      setLike(false);
      setLikeInc(likeInc + 1);
    }
  };

  // const MarketPlace_SmartContract =
  //   "0xf7b0A9458d5DBc19BCea657CadECD1862a00EeB9";xcxc
  const MarketPlace_SmartContract =
    "0xf18609EeAa8832A35ba26B161a176E8fa86D0C49";

  const buyNft = async (contractAddress, tokenIds) => {
    console.log("contractAddress", contractAddress);
    console.log("tokenIds", parseInt(tokenIds));
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
      //checking for nft address in marketplace

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const marketplace = new ethers.Contract(
        MarketPlace_SmartContract,
        MarketPlaceAbi,
        signer
      );
      let allListedNfts = await marketplace.fetchMarketItems();
      console.log("allListedNfts", allListedNfts);
      for (let i = 0; i < allListedNfts.length; i++) {
        //console.log("allListedNfts",allListedNfts[i]);
        console.log(allListedNfts[i].token);
        //conditional operator
        let nftAddress =
          allListedNfts[i].token.toLowerCase() == contractAddress.toLowerCase()
            ? true
            : false;
        let tokenAddress =
          allListedNfts[i].tokenId == parseInt(tokenIds) ? true : false;
        if (nftAddress && tokenAddress) {
          console.log("nftAddress", nftAddress);
          console.log("tokenAddress", tokenAddress);
          let tx = await marketplace.buyToken(
            allListedNfts[i].listingId.toNumber(),
            {
              value:parseEther("0.5"),
            }
          );
          console.log("tx", tx);
          break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const viewNft = async (contractAddress, tokenId) => {
    console.log("contractAddress", contractAddress);
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const marketplace = new ethers.Contract(
        MarketPlace_SmartContract,
        MarketPlaceAbi,
        signer
      );
      let tx = await marketplace.fetchMarketItems();
      console.log("tx", tx);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={Style.NFTCardTwo}>
      {NFT.map((el, i) => (
        <div className={Style.NFTCardTwo_box} key={i + 1}>
          <div className={Style.NFTCardTwo_box_like}>
            <div className={Style.NFTCardTwo_box_like_box}>
              <div className={Style.NFTCardTwo_box_like_box_box}>
                <p onClick={() => likeNFT()}>
                  {like ? <AiOutlineHeart /> : <AiFillHeart />}
                  {""}
                  <span>{likeInc + 1}</span>
                </p>
              </div>
            </div>
          </div>

          <div className={Style.NFTCardTwo_box_img}>
            <img
              src={el.value.image}
              alt="NFT"
              width={312}
              height={312}
              className={Style.NFTCardTwo_box_img_img}
            />
          </div>
          <div className={Style.NFTCardTwo_box_price}>
            <div className={Style.NFTCardTwo_box_price_box}>
              <small>Price</small>
              <p>0.05 ETH</p>
            </div>

            <div>
              <button className={Style.button} onClick={() => viewNft()}>
                View
              </button>
              <button
                className={Style.button}
                onClick={() => buyNft(el.value.contractAddress, el.value.id)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NftCard;

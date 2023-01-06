import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Web3 from "web3";
import { ethers } from "ethers";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import { Button, LikeProfile } from "../../components/componentsindex";
import MarketPlaceAbi from "../../sc/abi/MarketPlace.json";
import approveAbi from "./abi.json";

const NftCard = ({ NFT }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(0);

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
  //   "0xf7b0A9458d5DBc19BCea657CadECD1862a00EeB9";
  const MarketPlace_SmartContract =
    "0xf18609EeAa8832A35ba26B161a176E8fa86D0C49";

  const SellNft = async (contractAddress, tokenId) => {
    console.log("contractAddress", contractAddress);
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const erc721 = new ethers.Contract(contractAddress, approveAbi, signer);
      const tx = await erc721.approve(MarketPlace_SmartContract, tokenId);
      const marketplace = new ethers.Contract(
        MarketPlace_SmartContract,
        MarketPlaceAbi,
        signer
      );
      const selltx = await marketplace.listToken(
        contractAddress,
        tokenId,
        ethers.utils.parseEther("0.5")
      );
      console.log("selltx", selltx);
      window.alert("Transaction hash: " + tx.hash);
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
      const erc721 = new ethers.Contract(contractAddress, approveAbi, signer);
      const tx = await erc721.approve(MarketPlace_SmartContract, tokenId);
      const marketplace = new ethers.Contract(
        MarketPlace_SmartContract,
        MarketPlaceAbi,
        signer
      );
      const selltx = await marketplace.fetchMarketItems();
      console.log("selltx", selltx);
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
              <button
                className={Style.button}
                onClick={() => viewNft(el.value.contractAddress, el.value.id)}
              >
                View
              </button>
              <button
                className={Style.button}
                onClick={() => SellNft(el.value.contractAddress, el.value.id)}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NftCard;

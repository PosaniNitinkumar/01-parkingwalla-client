import React, { useState, useEffect, useCallback } from "react";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";
import { ethers } from "ethers";
import Web3 from "web3";

//INTERNAL IMPORT
import Style from "./BigNFTSilder.module.css";
import images from "../../img";
import Button from "../Button/Button";
import mintabi from "../../sc/abi/NFT.json";

const BigNFTSilder = () => {
  const [idNumber, setIdNumber] = useState(0);

  const sliderData = [
    {
      title: "Indian Nights",
      id: 1,
      name: "Shorupan",
      collection: "Entertainment",
      price: "0.005 ETH",
      like: 243,
      image: images.shorupan,
      nftImage: images.nft_image_1,
      time: {
        days: 21,
        hours: 40,
        minutes: 81,
        seconds: 15,
      },
    },
    {
      title: "Indian Foods",
      id: 2,
      name: "Shorupan",
      collection: "Health",
      price: "0.010 ETH",
      like: 243,
      image: images.shorupan,
      nftImage: images.nft_image_2,
      time: {
        days: 77,
        hours: 11,
        minutes: 21,
        seconds: 45,
      },
    },
    {
      title: "Indian Culture",
      id: 3,
      name: "Shorupan",
      collection: "Life Style",
      price: "0.003 ETH",
      like: 243,
      image: images.shorupan,
      nftImage: images.nft_image_3,
      time: {
        days: 37,
        hours: 20,
        minutes: 11,
        seconds: 55,
      },
    },
  ];

  //-------INC
  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData.length]);

  //-------DEC
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  // const MintNFT = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);

  //   //know current account
  //   const accounts = await provider.listAccounts();
  //   const account = accounts[0];
  //   console.log(account);
  //   const signer = await provider.getSigner();

  //   const mintingContract = new ethers.Contract(
  //     "0xfbF70592AfACF9e507a4e89eE482391ae72B7E9C",
  //     mintabi,
  //     signer
  //   );
  //   try {
  //     let cos = await mintingContract.maxSupply();
  //     // .mint(account,1)
  //     // .send({
  //     //   from: account,
  //     //   value: Web3.utils.toWei("0.06", "ether"),
  //     // })
  //     console.log(cos);
  //   } catch (err) {
  //     alert(err.reason);
  //   }
  // };
  const Minting_SmartContract = "0xfbF70592AfACF9e507a4e89eE482391ae72B7E9C";
  const MarketPlace_SmartContract="0xf7b0A9458d5DBc19BCea657CadECD1862a00EeB9";

  const MintNFT = async () => {
    console.log("clicked");
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      const web3 = new Web3(window.ethereum);
      var accounts = await web3.eth.getAccounts();
      var account = accounts[0];
      console.log(account);
      var contract = new web3.eth.Contract(mintabi, Minting_SmartContract);
      try {
        let cos = await contract.methods.maxSupply().call();
        console.log(cos);
        let tx = await contract.methods.mint(account, 1).send({
          from: account,
          value: Web3.utils.toWei("0.05", "ether"),
        });
        console.log(tx);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{sliderData[idNumber].title}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <img
                className={Style.bigNFTSlider_box_left_creator_profile_img}
                src={sliderData[idNumber].image}
                alt="profile image"
                width={50}
                height={50}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>Collection Creator</p>
                <h4>
                  {sliderData[idNumber].name}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />

              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Collection</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Minting Price</small>
              <p>
                {sliderData[idNumber].price} for <span>1 </span>
                {sliderData[idNumber].title} NFT
              </p>
            </div>

            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_icon}
              />
              <span>Pre-sale ending in</span>
            </p>

            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.days}</p>
                <span>Days</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.hours}</p>
                <span>Hours</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.minutes}</p>
                <span>mins</span>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.seconds}</p>
                <span>secs</span>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_button}>
              <button className={Style.button} onClick={() => MintNFT()}>
                Mint
              </button>
              <Button btnName="View" handleClick={() => {}} />
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLines
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => dec()}
            />
            <TbArrowBigRightLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => inc()}
            />
          </div>
        </div>

        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <img
              src={sliderData[idNumber].nftImage}
              alt="NFT IMAGE"
              className={Style.bigNFTSlider_box_right_box_img}
            />

            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSilder;

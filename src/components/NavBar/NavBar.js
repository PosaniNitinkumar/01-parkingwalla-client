import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Notification} from "./index";
import images from "../../img";


const NavBar = () => {
  let navigate = useNavigate();
  //----USESTATE COMPONNTS
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  //navbar options
  const options = [
    {
      name: "About",
      link: "/marketplace",
    },
    {
      name: "Services",
      link: "/drops",
    },
    {
      name: "Locations",
      link: "/drops",
    },
    {
      name: "Contact",
      link: "/drops",
    },
    {
      name: "Blog",
      link: "/drops",
    },
  ];

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo} onClick={() => navigate("/")}>
            <img
              src={images.mycryptobrand}
              alt="NFT MARKET PLACE"
              width={150}
              height={75}
            />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Enter your Area" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>
        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          {options.map((item, index) => {
            return (
              <div
                className={Style.navbar_container_right_marketplace}
                onClick={() => navigate(item.link)}
              >
                <p>{item.name}</p>
              </div>
            );
          })}
          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>
          <div className={Style.navbar_container_right_button_container}>
            {/* CREATE BUTTON SECTION */}
            <div className={Style.navbar_container_right_button}>
              <button className={Style.button}>
                Register
              </button>
            </div>
            {/* CREATE BUTTON SECTION */}
            <div className={Style.navbar_container_right_button}>
              <button className={Style.button} >
                Login
              </button>
            </div>
          </div>

          {/* USER PROFILE */}
          {/* <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <img
                src={images.shorupan}
                alt="Profile"
                width={80}
                height={80}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />

              {profile && <Profile />}
            </div>
          </div> */}

          {/* MENU BUTTON */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDBAR CPMPONE/NT */}
      {/* {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar setOpenSideMenu={setOpenSideMenu} />
        </div>
      )} */}
    </div>
  );
};

export default NavBar;

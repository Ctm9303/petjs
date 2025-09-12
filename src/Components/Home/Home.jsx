import React from 'react';
import './home.scss';
import video from '../../Assest/video.mp4'; // Sửa lại tên thư mục nếu cần
import { MdOutlinePets } from 'react-icons/md';
import { SiPetsathome } from "react-icons/si";
import { AiOutlineInstagram } from "react-icons/ai";
import { LiaFacebookSquare } from "react-icons/lia";
import { FaYoutube } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";

const Home = () => {
    return (
       <section className='home'>
            <div className="overlay"></div>
            <video src={video} muted autoPlay loop type="video/mp4"></video>

            <div className="homeContent container">
                <div className="textDiv">
                    <span className="smallText">
                        Our Packages
                    </span>
                    <h1 className="homeTitle">
                        Search your Pet
                    </h1>
                </div>

                <div className='cardDiv grid'>
                    <div className="destinationInput">
                        <label htmlFor="pet">Search your Pet:</label>
                        <div className="input flex">
                            <input type="text" placeholder="Enter pet name..." />
                            <MdOutlinePets className="icon" />
                        </div>
                    </div>
                    
                    <div className="searchOptions flex">
                        <SiPetsathome className="icon"/>
                        <span>CLICK</span>
                    </div>
                </div>

                <div className="homeFooterIcons flex">
                    <div className="rightIcons">
                        <LiaFacebookSquare className="icon"/>
                        <AiOutlineInstagram className="icon"/>
                        <FaYoutube className="icon"/>
                    </div>
                    <div className="leftIcons">
                        <BsListTask className="icon"/>
                        <TbApps className="icon"/>
                    </div>
                </div>
            </div>
       </section>
    )
}

export default Home;
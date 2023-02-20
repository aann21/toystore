import React from 'react'
import { FaFacebook, FaTwitter, FaReddit } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full h-40 bg-gradient-to-br from-bgColor to-green-500 flex flex-col items-center justify-center">
        <div className="border-t-4 border-[#83ff91] w-full"></div>
        <div className="border-t-2 border-white w-full"></div>
        <div className="w-full h-40 flex items-center justify-center">
            <div className="w-32 h-full flex flex-col gap-2 pt-4">
                <p className="text-textColor font-semibold text-xl"><a href="/*">Toystore</a></p>
                <p className="text-textColor"><a href="/*">Home</a></p>
                <p className="text-textColor"><a href="/*">Menu</a></p>
                <p className="text-textColor"><a href="/aboutus">About us</a></p>
            </div>
            <div className="w-3/6 h-full flex items-center justify-center">
                <div className="bg-bgColor flex rounded-full border-2 border-white">
                    <div className="w-28 h-auto border-r- border-white rounded-full p-1">
                        <div className="flex items-center justify-center bg-white rounded-full">
                            <p className="text-black">Email</p>
                        </div>
                    </div>
                    <input type="text" placeholder="Enter your email for notification..." className="w-72 h-auto outline-none p-1 bg-bgColor placeholder:text-textColor" />
                    <button type="button" className=" w-28 h-auto p-1 rounded-full bg-white flex items-center justify-center hover:shadow-md backdrop-blur-sm hover:bg-bgColor hover:text-white hover:transition hover:ease-in-out hover:duration-200 active:bg-white active:text-textColor">Send</button>
                </div>
            </div>
            <div className="w-32 h-full flex flex-col gap-2 pt-4">
                <p className="text-textColor font-semibold text-xl">Social</p>
                <p className="text-textColor flex gap-2"><FaFacebook/>Facebook</p>
                <p className="text-textColor flex gap-2"><FaTwitter/>Twitter</p>
                <p className="text-textColor flex gap-2"><FaReddit/>Reddit</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
import React, { useEffect, useState } from "react"
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import NotFound from "../img/NotFound.svg"
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";


const RowContainerMenu = ({data}) => {

    const [items, setItems] = useState([])
    const [{cartItems},dispatch] = useStateValue();

    const addToCart =()=>{
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        });
        localStorage.setItem("cartItems", JSON.stringify(items))
    }

   useEffect(() => {addToCart()}, [items])

  return (
    <div className="w-full flex items-center gap-3 my-12 scroll-smooth overflow-x-hidden flex-wrap justify-center">
        {data && data.length > 0 ? (data.map((item) =>(
                <div key={item.id} className="w-300 h-[250px] min-w-[300px] md:w-340 md:min-w-[340px] bg-cardOverlay rounded-lg p-2 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between">
                    <div className="w-full flex items-center justify-between">
                        <motion.div whileHover={{scale:1.1}} className="w-40 h-40 -mt-2 drop-shadow-2xl">
                            <a href={`product/${item.id}`}><img src={item?.imageURL} alt="" /></a>
                        </motion.div>
                        <motion.div whileTap={{scale:0.8}} className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer hover:shadow-md" onClick={()=>setItems( [...cartItems, item])}>
                            <MdShoppingBasket className="text-white"/>
                        </motion.div>
                    </div>
                    <div className="w-full flex flex-col items-end justify-end">
                        <p className="text-textColor font-semibold text-base md:text-lg"><a href={`product/${item.id}`}>{item?.title}</a></p>
                        <p className="mt-1 text-sm text-gray-500">{item?.company}</p>
                        <div className="flex items-center gap-8">
                            <p className="text-lg text-headingColor font-semibold"><span className="text-sm text-red-500">$</span>{item?.price}</p>
                        </div>
                    </div>
                </div>
            ))) :(
                <div className="w-full flex flex-col items-center justify-center">
                    <img src={NotFound} alt="" className="h-340"/>
                    <p className="text-xl text-headingColor font-semibold my-2">Items not available</p>
                </div>
            )}
    </div>
  );
  
};

export default RowContainerMenu;
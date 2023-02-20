import React, { useEffect, useState } from 'react'
import HeroBg from "../img/heroBg.png"
import { IoBagCheck } from "react-icons/io5";
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
import NotFound from "../img/NotFound.svg"
import { Await, useParams } from 'react-router-dom';
import { actionType } from '../context/reducer';
import CartContainer from './CartContainer';
import select from'../img/select.png'






const FoodDetails =  () => {
    const [{toyItems, cartItems, cartShow},dispatch] = useStateValue();
    const [items2, setItems2] = useState([]);
    const [vImage,setVImage] = useState(select);
    const param = useParams();
    const items = toyItems?.filter((n)=> n.id===param.id)


    const addToCart =()=>{
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items2,
        });
        localStorage.setItem("cartItems", JSON.stringify(items2))
    }

   useEffect(() => {addToCart()}, [items2])

   useEffect(() => {}, [cartShow])

    
    
    
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
        <section className=" w-full h-40 bg-bgColor backdrop-blur-md rounded-3xl drop-shadow-lg flex justify-center items-center">
            <p className=" text-headingColor font-semibold text-6xl ">Product Details</p>
        </section>
            {items && items.map((item)=>(
                <section key={item.id}  className="w-2/3 flex items-center justify-center my-5 gap-6 bg-white p-10 drop-shadow-md rounded-lg">
                    <div className="grid grid-rows-3 gap-10">
                        <div className="w-20 h-50" >
                            <img src={item?.imageURL} alt="" className="w-auto h-auto rounded-lg" onClick={()=>setVImage(item?.imageURL)}/>
                        </div>
                        <div className="w-20 h-50" >
                            <img src={item?.imageURL2} alt="" className="w-auto h-full rounded-lg" onClick={()=>setVImage(item?.imageURL2)}/>
                        </div>                
                        <div className="w-20 h-50" >
                            <img src={item?.imageURL3} alt="" className="w-auto h-full rounded-lg" onClick={()=>setVImage(item?.imageURL3)}/>
                        </div>                
                    </div>
                    <div className="w-2/5 h-auto border border-black p-1 rounded-md ">
                            <img src={vImage} alt="" />
                    </div>
                    <div className="w-auto h-[35rem] flex flex-col flex-auto gap-10 items-center ">
                            <p className="text-textColor font-semibold text-2xl text-center">{item?.title}</p>
                        <div className="w-4/5 h-2/4 bg-bgColor rounded-lg flex flex-col p-10 gap-4 justify-center">
                                <p className="text-textColor text-xl font-semibold">MANUFACTURING DATE: <span className="font-normal text-xl">{item?.nmDate}</span></p>
                                <p className="text-textColor text-xl font-semibold">COMPANY: <span className="font-normal text-xl">{item?.company}</span></p>
                                <p className="text-textColor text-xl font-semibold">AGE: <span className="font-normal text-xl">{item?.age}</span></p>
                                <p className="text-red-500 text-xl font-semibold">{item?.limited}</p>
                        </div>
                        <p className="text-orange-300 font-semibold text-2xl border-b-2">$<span className="font-normal">{item?.price}</span></p>
                        <div className="flex justify-between border-b-2">
                            <p className="text-textColor text-xl font-semibold">QUANTITY:</p>
                            <select className="bg-gray-100 outline-none border-xl border-red-800 rounded-full text-textColor text-xl font-normal px-5" name="quantity" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <button type="button" className="w-32 h-10 rounded-full bg-bgColor flex items-center justify-center cursor-pointer hover:shadow-md backdrop-blur-sm hover:bg-gray-100 hover:transition hover:ease-in-out hover:duration-200 active:bg-bgColor" onClick={()=>setItems2( [...cartItems, item])}>    
                            <IoBagCheck />
                            <p>Add to cart</p>
                        </button>
                    </div>
                </section>
                )   
            )}

        <section className="">
            <p className="text-textColor font-semibold text-3xl before:relative before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-300 to-orange-600 underline">Description</p>
        </section>
        {items && items.map((item)=>(
            <section className="w-5/6 flex items-center justify-center my-5 gap-6 bg-white p-10 drop-shadow-md rounded-lg whitespace-pre">
                <p className=" text-textColor text-xl ">{item?.description}</p>
            </section>
            )
        )}
        
        <div className="w-full flex items-center justify-between">
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-300 to-green-600 transition-all ease-in-out duration-100 ">Hot products</p>
        </div>
        <RowContainer flag={true} data={toyItems?.filter((n)=>n.category==="shfiguarts")}/>
        {cartShow && (
          <CartContainer/>
        )}

    </div>
  )
}

export default FoodDetails
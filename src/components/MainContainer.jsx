import React, { useEffect } from 'react'
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'
import { useParams } from 'react-router-dom'


const MainContainer = () => {
const [{toyItems, cartShow},dispatch] = useStateValue();


useEffect(() => {}, [cartShow])


  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

       <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-300 to-green-600 transition-all ease-in-out duration-100 ">Hot Products</p>


        </div>
        <RowContainer flag={true} data={toyItems?.filter((n)=>n.category==="shfiguarts")}/>
       </section>

        <MenuContainer/>

        {cartShow && (
          <CartContainer/>
        )}
    </div>
  )
}

export default MainContainer 
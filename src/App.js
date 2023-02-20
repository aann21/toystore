import React from "react"
import { Route, Routes } from"react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, ProductDetails, Footer, Header, MainContainer, AboutUs } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllToyItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "./context/reducer";

const App = () => {
  const [{},dispatch] = useStateValue();

  const fetchData = async () =>{
    await getAllToyItems().then((data)=>{
      dispatch({
        type: actionType.SET_TOY_ITEMS,
        toyItems: data
      });
    });

  };

  useEffect(()=>{
    fetchData();
  },[]);

  return (

<AnimatePresence exitBeforeEnter>
    <div className="w-screen h-auto flex flex-col bg-primary">
      <Header/>

      <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
        <Routes>
          <Route path="/*" element={<MainContainer />} />
          <Route path="/createItem" element={<CreateContainer />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </main>

      <Footer/>
    </div>
</AnimatePresence>
  )
}

export default App;
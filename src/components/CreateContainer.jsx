import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney} from 'react-icons/md';
import { categories, ages, limiteds } from '../utils/data';
import Loader from './Loader';
import {ref, uploadBytesResumable, deleteObject, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.config';
import { getAllToyItems, saveItem } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { AiOutlineIdcard, AiTwotoneCalendar, IconName } from "react-icons/ai";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditor from 'react-froala-wysiwyg';

const CreateContainer = () => {

  let [inputType, setInputType] = useState("text");
  const [title, setTitle] = useState("");
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [mnDate, setMnDate] = useState("");
  const [company, setCompany] = useState("");
  const [age, setAge] = useState(null);
  const [description, setDescription] = useState("");
  const [limited, setLimited] = useState(null)
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [imageAsset2, setImageAsset2] = useState(null);
  const [imageAsset3, setImageAsset3] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{},dispatch] = useStateValue();

{/*image1*/}
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage,`images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed',(snapshot)=>{
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    },(error)=>{
      console.log(error);
      setFields(true);
      setMsg('Error while uploading, try again!😳');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>{
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg('Image uploaded successfully!');
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      });
    });
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage,imageAsset);
    deleteObject(deleteRef).then(()=>{
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg('Image deleted successfully!');
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

{/*image2*/}

  const uploadImage2 = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage,`images2/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed',(snapshot)=>{
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    },(error)=>{
      console.log(error);
      setFields(true);
      setMsg('Error while uploading, try again!😳');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>{
        setImageAsset2(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg('Image 2 uploaded successfully!');
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      });
    });
  };
  const deleteImage2 = () => {
    setIsLoading(true);
    const deleteRef = ref(storage,imageAsset2);
    deleteObject(deleteRef).then(()=>{
      setImageAsset3(null);
      setIsLoading(false);
      setFields(true);
      setMsg('Image deleted successfully!');
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

{/*image3*/}

  const uploadImage3 = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage,`images3/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed',(snapshot)=>{
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    },(error)=>{
      console.log(error);
      setFields(true);
      setMsg('Error while uploading, try again!😳');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>{
        setImageAsset3(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg('Image 2 uploaded successfully!');
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      });
    });
  };
  const deleteImage3 = () => {
    setIsLoading(true);
    const deleteRef = ref(storage,imageAsset3);
    deleteObject(deleteRef).then(()=>{
      setImageAsset3(null);
      setIsLoading(false);
      setFields(true);
      setMsg('Image deleted successfully!');
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if((!title || !material || !imageAsset||!imageAsset2||!imageAsset3|| !price || !category||category==="other"||!mnDate||!company||!limited||!age||!description)){
      setFields(true);
      setMsg("Required fields can't be empty");
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }else{
      const data ={
        id:`${Date.now()}`,
        title: title,
        imageURL: imageAsset,
        imageURL2: imageAsset2,
        imageURL3: imageAsset3,
        category: category,
        material: material,
        qty: 1,
        price: price,
        nmDate: mnDate,
        company: company,
        limited: limited,
        age: age,
        description:description
      }
      saveItem(data);
      setIsLoading(false);
      setFields(true);
      setMsg('Data uploaded successfully!');
      clearData();
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading, try again!😳');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData =()=>{
    setTitle("");
    setImageAsset(null);
    setImageAsset2(null);
    setImageAsset3(null);
    setMaterial("");
    setPrice("");
    setCategory(category);
    setMnDate("");
    setCompany("");
    setAge(age);
    setLimited(limited);
    setDescription("");

  };

  const fetchData = async () =>{
    await getAllToyItems().then((data)=>{
      dispatch({
        type: actionType.SET_TOY_ITEMS,
        toyItems: data
      });
    });

  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        { 
          fields && (
            <motion.p 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}} 
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger" ? 'bg-red-400 text-red-800':'bg-emerald-400 text-emerald-800'}`}>{msg}</motion.p>
          )
        }

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700  " /> 
          <input type="text" required value = {title} onChange={(e)=>setTitle(e.target.value)} placeholder='Give me a title...' className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <AiOutlineIdcard className="text-xl text-gray-700  " /> 
          <input type="text" required value = {company} onChange={(e)=>setCompany(e.target.value)} placeholder='Company' className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <AiTwotoneCalendar className="text-xl text-gray-700  " /> 
          <input type={inputType} required value = {mnDate} onChange={(e)=>setMnDate(e.target.value)} placeholder="Manufacturing date" className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" onFocus={()=>setInputType("date")} onBlur={()=>setInputType("text")} />
        </div>

        <div className="w-full">
          <select onChange={(e) => setCategory(e.target.value)} className="outline-none w-full border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
            <option value="other" className="bg-white">Select Category</option>
            {categories && categories.map((item) =>(
              <option key={item.id} className="text-base border-0 outline-none capitalize bg-white text-headingColor" value={item.urlParamName}>{item.name}</option>
            ))};
          </select>
        </div>

        <div className="w-full">
          <select onChange={(e) => setAge(e.target.value)} className="outline-none w-full border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
            <option value="other" className="bg-white">Select age</option>
            {ages && ages.map((item) =>(
              <option key={item.id} className="text-base border-0 outline-none capitalize bg-white text-headingColor" value={item.urlParamName}>{item.name}</option>
            ))};
          </select>
        </div>

        <div className="w-full">
          <select onChange={(e) => setLimited(e.target.value)} className="outline-none w-full border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
            <option value="other" className="bg-white">Select rarity</option>
            {limiteds && limiteds.map((item) =>(
              <option key={item.id} className="text-base border-0 outline-none capitalize bg-white text-headingColor" value={item.urlParamName}>{item.name}</option>
            ))};
          </select>
        </div>
        {/*image*/}
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? <Loader/>:<>
              {!imageAsset ? (<>
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
                    <MdCloudUpload  className="text-gray-500 text-3xl hover:text-gray-700"/>
                    <p className="text-gray-500 hover:text-gray-700">Click here to upload</p>
                  </div>

                  <input type="file" name="uploadimage" accept="image/*" onChange={uploadImage} className="w-0 h-0" />

                </label>
              </>):(<>
                <div className="relative h-full">
                  <img src={imageAsset} alt="upload image" className="w-full h-full object-cover" />
                  <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out" onClick={deleteImage}><MdDelete className="text-white"/></button>
                </div></>)}
          </>}
        </div>
        {/*image2*/}
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? <Loader/>:<>
              {!imageAsset2 ? (<>
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
                    <MdCloudUpload  className="text-gray-500 text-3xl hover:text-gray-700"/>
                    <p className="text-gray-500 hover:text-gray-700">Click here to upload</p>
                  </div>

                  <input type="file" name="uploadimage" accept="image/*" onChange={uploadImage2} className="w-0 h-0" />

                </label>
              </>):(<>
                <div className="relative h-full">
                  <img src={imageAsset2} alt="upload image" className="w-full h-full object-cover" />
                  <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out" onClick={deleteImage2}><MdDelete className="text-white"/></button>
                </div></>)}
          </>}
        </div>
        {/*image3*/}
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? <Loader/>:<>
              {!imageAsset3 ? (<>
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
                    <MdCloudUpload  className="text-gray-500 text-3xl hover:text-gray-700"/>
                    <p className="text-gray-500 hover:text-gray-700">Click here to upload</p>
                  </div>

                  <input type="file" name="uploadimage" accept="image/*" onChange={uploadImage3} className="w-0 h-0" />

                </label>
              </>):(<>
                <div className="relative h-full">
                  <img src={imageAsset3} alt="upload image" className="w-full h-full object-cover" />
                  <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out" onClick={deleteImage3}><MdDelete className="text-white"/></button>
                </div></>)}
          </>}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full p-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl"/>
            <input type="text" required value={material} onChange={(e)=>setMaterial(e.target.value)} placeholder="Material" className="w-full h-full bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor " />
          </div>

          <div className="w-full p-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl"/>
            <input type="text" required value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price" className="w-full h-full bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor " />
          </div>
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-start gap-2">
          <AiOutlineIdcard className="text-xl text-gray-700  " /> 
          <textarea type="text" required value = {description} rows="8" onChange={(e)=>setDescription(e.target.value)} placeholder='description' className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
        </div>

        <div className="flex items-center w-full ">
            <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold" onClick={saveDetails}>Save</button>
        </div>

      </div>
    </div>
  );
};

export default CreateContainer
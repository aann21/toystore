import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc } from "firebase/firestore";
import { app,firestore } from "../firebase.config";

//Saving new item
export const saveItem = async (data) => {
    await setDoc(doc(firestore,"toyItems",`${Date.now()}`),data,{merge:true,});
};

export const getAllToyItems = async () => {
    const items = await getDocs(
        query(collection(firestore,"toyItems"), orderBy("id","desc"))
    );

    return items.docs.map((doc)=>doc.data());
};





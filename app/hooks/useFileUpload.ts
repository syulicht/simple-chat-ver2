import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../lib/firebase/firebase';

const useFileUpload = async(file : File | null | undefined, id : number) => {
  try{
    if(!file) return;

    const storageRef = ref(storage, `images/${id}`);

    await uploadBytes(storageRef, file);
  }catch(error){
    console.log(error);
  }

    
}

export default useFileUpload;
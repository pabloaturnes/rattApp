
import { useState } from "react"
import { getFirestore, collection, getDoc, getDocs, addDoc,setDoc,doc, updateDoc,deleteDoc } from 'firebase/firestore/lite';
import appConfig from "../config/firebaseConfig"

const useData = () =>{ 

    const db = getFirestore(appConfig);
    const [meetingData, setMeeting] = useState(null)




    const getMeeting = () =>{

    }




    const createMeeting = async(newMeetingData) =>{
        try {
            //creo el documento nueva fiesta 
            const docRef = await addDoc(collection(db, "meetings"), {
            owner: newMeetingData.id,
            name : newMeetingData.name,
            atendees : [newMeetingData.id],
            data : [],
            });

    //actualizo la nueva reunion agregandole la nueva informacion de los gastos agregados.
            await updateDoc(docRef, { id: docRef.id })
            

            //chequear si se actualizo bien y ver si el get meetings lo agarra.
            


        } catch (e) {
            console.error("error al crear la reunion: ", e);
        }
    }



    const deleteMeeting = () =>{

    }



    const updateMeetingData =  (newPeopleData,meetingId) =>{
        
        try {
                //obtengo el documento de la reunion actual
                const docRef = doc(db, "meetings", meetingId)
            //actualizo el documento agregandole la nueva informacion de los gastos agregados.
            updateDoc(docRef, { data: newPeopleData })
        } catch (e) {
            console.error("error al editar la reunion: ", e);
        }
    }


    const getUserMeetings = async (userId) => {

        try {
            const querySnapshot = await getDocs(collection(db, "meetings"));

            let userMeetings = []

            querySnapshot.forEach((doc) => {
            if(doc.data().atendees.includes(userId)){
                userMeetings.push(doc.data())
            }
            });
          
            return userMeetings


        } catch (error) {
            console.log("error: ",error)
        }
        
    }



    const deleteThisUserFromMeeting = async (userId,meetingId) =>{

        try {
            const docRef = doc(db, "meetings", meetingId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {

                let docData = docSnap.data()
                
                if(docData.owner == userId){
                    //si es el owner se borra directamente la reunion
  

                    await setDoc(docRef, {})

                    //finalmente borra el documento // en firebase si se borra un documento y no sus propiedades, estas quedan en la bd
                    deleteDoc(docRef)
                }else{
                    // si no es el owner, se actualizan los asistentes
                    let newAtendees = [...docSnap.data().atendees]
                    const filteredAtendees = newAtendees.filter((atendee) => atendee != userId)
                    updateDoc(docRef, { atendees: filteredAtendees })
                }

 


            } else {
            console.log("no existe la reunion solicitada");
            }
        } catch (error) {
            console.log("error: ", error)
        }

    }




    const addThisUserToAMeeting = async (userId,meetingId) =>{
        
        try {
            const docRef = doc(db, "meetings", meetingId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {


             let newAtendees = [...docSnap.data().atendees]
             newAtendees.push(userId)

            await updateDoc(docRef, { atendees: newAtendees })

            return true


            } else {
            return false
            }
        } catch (error) {
            console.log("error: ", error)
            return false
        }


    }


    return {getMeeting,createMeeting,deleteMeeting,deleteThisUserFromMeeting,addThisUserToAMeeting,updateMeetingData, getUserMeetings}

}

export default useData


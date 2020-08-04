import React, {useState, createContext, useContext} from "react";
import { newSchedule } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import { auth, signInWithGoogle, addSchedule } from "../../firebase";


const AddSchedule = () => {
    const[date, setDate] = useState("");
    const[title, setTitle] = useState("");
    const[start, setStart] = useState('');
    const [error, setError] = useState(null);
    const user = useContext(UserContext);

    // const createSchedule = async(event, title, date) => {
    //     event.preventDefault();
    //     try{
    //         console.log("checking");
    //       const {user} = await auth.createSchedule(title,date);
    //       console.log("checking");
    //       addSchedule(user, {title: title, date: date});
    //       console.log("checking");

    //     }
    //     catch(error){
    //       setError('Error adding schedule');
    //     }
    //     setTitle("");
    //     setDate("");
    //   };
    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
        if(name === 'date') {
            setDate(value);
        }
        else if(name === 'sheduletitle'){
          setTitle(value);
        }
    };
    return (
    <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form className="">
        <label htmlFor="userEmail" className="block">
            Title:
        <input
            type="email"
            className="my-1 p-1 w-full"
            name="scheduletitle"
            value = {title}
            placeholder="schedule title"
            id="scheduletitle"
            onChange = {(event) => onChangeHandler(event)}
        />
        </label>
        <label htmlFor="Date" className="block">
            Date:
        <input
            type="Date"
            className="my-1 p-1 w-full"
            name="date"
            value = {date}
            placeholder=""
            id="date"
            onChange = {(event) => onChangeHandler(event)}
        />
        </label>
        <button 
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" 
            onClick = {(event) =>
             {addSchedule(event, title, date)}}>
            일정 추가
        </button>
        </form>                   
    </div>
    )
}
export default AddSchedule;
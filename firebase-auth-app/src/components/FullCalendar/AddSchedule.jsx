import React, {useState, createContext, useContext} from "react";
import { newSchedule } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import { auth, signInWithGoogle, addSchedule } from "../../firebase";


const AddSchedule = () => {
    const[start_date, setstart_Date] = useState("");
    const[end_date, setend_Date] = useState("");
    const[start_time, setstart_time] = useState("");
    const[end_time, setend_time] = useState("");
    const[title, setTitle] = useState("");
    const [error, setError] = useState(null);
    const user = useContext(UserContext);

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
        if(name === 'start_date') {
            setstart_Date(value);
        }
        else if(name === 'end_date'){
            setend_Date(value);
          }
        else if(name === 'start_time'){
            setstart_time(value);
          }
        else if(name === 'end_time'){
            setend_time(value);
          }
        else if(name === 'scheduletitle'){
          setTitle(value);
        }
    };
    return (
    <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
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
            name="start_date"
            value = {start_date}
            placeholder=""
            id="start_date"
            onChange = {(event) => onChangeHandler(event)}
        />
                <input
            type="time"
            className="my-1 p-1 w-full"
            name="start_time"
            value = {start_time}
            placeholder=""
            id="start_time"
            onChange = {(event) => onChangeHandler(event)}
        />
        <input
            type="Date"
            className="my-1 p-1 w-full"
            name="end_date"
            value = {end_date}
            placeholder=""
            id="end_date"
            onChange = {(event) => onChangeHandler(event)}
        />
        <input
            type="time"
            className="my-1 p-1 w-full"
            name="end_time"
            value = {end_time}
            placeholder=""
            id="end_time"
            onChange = {(event) => onChangeHandler(event)}
        />

        </label>
        <button 
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" 
            onClick = {(event) =>
             {addSchedule(user, title, start_date,start_time,end_date,end_time)}}>
            일정 추가
        </button>
    </div>
    )
}
export default AddSchedule;
import React, {useState, createContext} from "react";


const AddSchedule = () => {
    const[date, setDate] = useState('');
    const[title, setTitle] = useState('');
    const[start, setStart] = useState('');
    const [error, setError] = useState(null);

    const scheduleHandler = () =>{
        
    } ;

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
            type="title"
            className="mt-1 mb-3 p-1 w-full"
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
        <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {(event) =>
             {scheduleHandler();}}>
            일정 추가
        </button>
        </form>                   
    </div>
    )
}

export default AddSchedule;
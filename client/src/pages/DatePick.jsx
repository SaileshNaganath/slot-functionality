import React,{useState,useEffect}from "react";
import { useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import {getSlots} from '../actions/slotActions';


const DatePick = () => {

  const [selectedDate, setSelectedDate] = useState('');

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
     navigate(`/selectTime/${selectedDate}`);
  };

  const dispatch = useDispatch();
  const slotAction = useSelector((state)=>state.slotAction);
  const {slots,loading} = slotAction;

  useEffect(()=>{
    dispatch(getSlots());
  },[dispatch]);

  return (
<div className="form-setup">
  <h1 className="form-heading">
    Select Date
  </h1>
  <p className="fade-text">
    Select the following according to your convenience.
  </p>
  {loading ? (
    <p>Loading...</p>
  ) : (
    <>
      {Array.isArray(slots) && slots.length > 0 ? (
        <form onSubmit={handleSubmit} className="form-align">
          {slots.map((slot) => (
            <label key={slot._id}>
              <input
                className="radio-button"
                type="radio"
                value={slot._id}
                checked={selectedDate === slot._id}
                name="dateGroup"
                onChange={(event) => setSelectedDate(event.target.value)}
              />
              {slot.date}
              <br />
            </label>
          ))}
          <div className="button-group">
            <button onClick={() => navigate("/")} className="back-button">
              Cancel Booking 
            </button>
            {selectedDate && (<> 
            <button className="next-button" type="submit">
              Next Step
            </button>
            </>)}
           
          </div>
        </form>
      ) : (
        <>
          <p key={slots._id}>Currently slots are not available. Come back after some time.</p>
          <div className="button-group">
        <button onClick={() => navigate("/")} className="cancel-button">
        Go to Home
        </button>
      </div>
          </>
      )}
    </>
  )}
</div>

  );
};

export default DatePick;



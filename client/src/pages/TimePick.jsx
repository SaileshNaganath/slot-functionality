import React,{useState,useEffect}from "react";
import { useNavigate,useParams} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import {getSlotByDate} from '../actions/slotActions';

const TimePick = () => {
  const navigate = useNavigate();

const params = useParams();
const {id:dateId} = params;
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  //    // Find the selected slot
  // const selectedSlot = slots.find(slot => slot._id === selectedTime);

  // // Check if the selected slot is found
  // if (selectedSlot) {
    // Update the stock value of the selected slot
    // const updatedSlot = {
    //   ...selectedSlot,
    //   timeSlots: selectedSlot.timeSlots.map(timeSlot => ({
    //     ...timeSlot,
    //     stock: 0 // Set stock to 0
    //   }))
    // };
  // const updatedSlot ={
  //     stock:0
  // }
  //   // Dispatch action to update the slot with the new stock value
  //   dispatch(updateSlot(updatedSlot)); 

    navigate(`/summary/${selectedTime}`);
  
  };
  
  const dispatch = useDispatch();
  const slotAction = useSelector((state)=>state.slotAction);
  const {slots,loading} = slotAction;

  useEffect(()=>{
    dispatch(getSlotByDate(dateId));
  },[dispatch,dateId]);
  // Filter out time slots with stock zero
  const filteredSlots = slots.map(slot => ({
    ...slot,
    timeSlots: slot.timeSlots.filter(timeSlot => timeSlot.stock > 0)
  })).filter(slot => slot.timeSlots.length > 0);

  return (
  
<div className="form-setup">
  <h1 className="form-heading">
    Select Time
  </h1>
  <p className="fade-text">
    Select the following time
  </p>
  {loading ? (
    <p>Loading...</p>
  ) : (
    <form onSubmit={handleSubmit} className="form-align">
      {filteredSlots.map((slot) => (
        slot.timeSlots && slot.timeSlots.length > 0 ? (
          slot.timeSlots.map((timeSlot) => (
            <>
            <label key={timeSlot.id}>
              <input
                className="radio-button"
                type="radio"
                value={timeSlot._id}
                checked={selectedTime === timeSlot._id}
                name="dateGroup"
                onChange={(event) => setSelectedTime(event.target.value)}
              />
              {timeSlot.fromTime}-{timeSlot.toTime}
              <br />
            </label>
            </>
          
          ))
        ) : (
          <>
          <p key={slot._id}>Currently slots are not available. Come back after some time.</p>
          <div className="button-group">
        <button onClick={() => navigate("/")} className="cancel-button">
        Go to Home
        </button>
      </div>
          </>
         
        )
      ))}
      {slots.some(slot => slot.timeSlots && slot.timeSlots.length > 0) && (
        <div className="button-group">
          <button onClick={() => navigate("/")} className="cancel-button">
            Cancel Booking
          </button>
          {selectedTime && (
            <button className="next-button" type="submit">
              Next Step
            </button>
          )}
        </div>
      )}
    </form>
  )}
</div>
  
  );
};

export default TimePick;

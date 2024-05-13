import React,{useState, useEffect} from "react";
import axios from "axios";
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate,useParams } from "react-router-dom";
import {getSummary,updateSlot} from '../actions/slotActions';

const Summary = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {id:selectedId} = params;

  const dispatch = useDispatch();
  const slotAction = useSelector((state)=>state.slotAction);
  const {slots,loading} = slotAction;

  // State to track remaining time
  const [remainingTime, setRemainingTime] = useState(240); // Initial time in seconds

  useEffect(() => {
    // Fetch summary
    dispatch(getSummary(selectedId));

    // Update stock to 0 initially
    const initialUpdate = {
      stock: 0
    };
    dispatch(updateSlot(initialUpdate, selectedId));

    // Update stock to 1 after 4 minutes if confirm button is not clicked
    const timeout = setTimeout(() => {
      const updatedSlot = {
        stock: 1
      };
      dispatch(updateSlot(updatedSlot, selectedId));
      navigate("/datepick"); // Redirect to "/"
    }, 240000); // 4 minutes in milliseconds

    // Update remaining time every second
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clear interval and timeout on component unmount
    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, [dispatch, selectedId, navigate]);

  // Handle cancel button click
  const handleCancelClick = () => {
    // Update stock to 1
    const updatedSlot = {
      stock: 1
    };
    dispatch(updateSlot(updatedSlot, selectedId));
    // Redirect to "/"
    navigate("/datepick");
  };
  // Format remaining time to minutes:seconds
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  const checkoutHandler = async (amount) => {

    const { data: { key } } = await axios.get("http://localhost:8080/api/getkey")

    const { data: { order } } = await axios.post("http://localhost:8080/api/checkout", {
        amount
    })

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "LIBI Pet Groom",
        description: "Razorpay Integration",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:8080/api/paymentverification",
        prefill: {
            name: "Customer Name",
            email: "customer.name@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
}

  return (

    <div className="form-setup">
      <h1 className="form-heading">
        Finishing up
      </h1>
      <p className="fade-text">
        Double-check everything looks OK before payment.
      </p>

      <div className="summary-table">
        <div className="summary-fields">
          <div>
            <span className="dark-text">
              Name
            </span>
          </div>
          <div>
            <span className="dark-text">
             Price
            </span>
          </div>
        </div>

        <hr />

            <div className="summary-fields">
              <div>
                <p className="fade-text">Combo 1 + Mobile</p>
              </div>
              <div>
                <p className="dark-text">
                Rs.700/-
                </p>
              </div>
            </div>
{loading?(<p>Loading...</p>):(<>
  {Array.isArray(slots) && slots.map((slot) => (
    <div className="summary-fields" key={slot.timeSlot?._id}>
        <div>
            <p className="fade-text">Date & Time</p>
        </div>
        <div>
            <p className="dark-text">
                {slot.date} {slot.timeSlot?.fromTime}-{slot.timeSlot?.toTime}
            </p>
        </div>
    </div>
))}

</>)}
            <div className="summary-fields">
              <div>
                <p className="fade-text">GST (18%)</p>
              </div>
              <div>
                <p className="dark-text">
                Rs.100/-
                </p>
              </div>
            </div>
<hr/>
            <div className="summary-fields">
              <div>
                <p className="fade-text">Total</p>
              </div>
              <div>
                <p className="dark-text">
                Rs.800/-
                </p>
              </div>
            </div>
      </div>

      <div>
        <p>Time Remaining: {formattedTime}</p>
      </div>

      <div className="button-group">
        <button
          onClick={() => handleCancelClick()}
          className="cancel-button"
        >
          Cancel
        </button>

        <button
          className="next-button"
          onClick={()=>checkoutHandler(500)}
        >
          Confirm
        </button>
      </div>
    </div>
 
  );
};

export default Summary;

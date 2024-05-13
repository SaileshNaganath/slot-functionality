import React, { useState,useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {createSlotDate,deleteSlot,getSlots} from "../actions/slotActions";

function SlotCreation(){

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
 

  const slotAction = useSelector((state)=>state.slotAction);
  const {slots,loading} = slotAction;
  useEffect(()=>{
    dispatch(getSlots());
  },[dispatch]);

  const handleDateSubmit = async () => { 
      try{

            // Find the date associated with the slot
            let dateForSlot = selectedDate;
            // If the slot is found, include the date in slotToAccept
            if (dateForSlot) {
            const slotDate = {
                date: dateForSlot,
            }

            dispatch(createSlotDate(slotDate));
            }
      } 
      catch (error) {
        // Handle any errors during the dispatch or navigation
        console.error('Error:', error);
      }
    }
 const handleNext = (index)=>{
          navigate(`/slot/${index}`);
    }
    const handleDeleteDate = (index) => {
      dispatch(deleteSlot(index));
    }
  return (
     <div>
       <TextField
         label="Select Date"
         type="date"
         value={selectedDate}
         onChange={(e)=>setSelectedDate(e.target.value)}
         InputLabelProps={{
           shrink: true,
         }}
       />
       <Button onClick={handleDateSubmit}>Submit Date</Button>
       {loading ? (<p>Loading...</p>):
      (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slots.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell>
                  <Button onClick={() => handleNext(slot._id)}>{slot.date}</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteDate(slot._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
     </div>
  );
 }

export default SlotCreation;

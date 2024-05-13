import React, { useState,useEffect } from 'react';
import { useParams} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {getSlotByDate,createTimeSlot, deleteTimeSlot} from "../actions/slotActions";

function SlotCreation(){
 
const params = useParams();
const {id:dateId} = params;

  const dispatch = useDispatch();
  const slotAction = useSelector((state)=>state.slotAction);
  const {slots,loading} = slotAction;


  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');



  useEffect(()=>{
    dispatch(getSlotByDate(dateId));
  },[dispatch,dateId]);
 
 const handleRefresh=()=>{
  dispatch(getSlotByDate(dateId));
 }
  const handleTimeSlotSubmit = () => {
 
      const slotToAccept = {
            fromTime:fromTime,
            toTime:toTime,
      };
      // Dispatch createSlot action to save the new slot to the backend
      dispatch(createTimeSlot(slotToAccept,dateId));
      
        // Reset the fromTime and toTime states
    setFromTime('');
    setToTime('');
    
  };
 

   const handleDeleteEntry = (index) => {
    dispatch(deleteTimeSlot(index));
  
 };

 
  return (
            <>
       <TextField
         label="From Time"
         type="time"
         value={fromTime}
         onChange={(e) => setFromTime(e.target.value)}
         InputLabelProps={{
           shrink: true,
         }}
       />
       <TextField
         label="To Time"
         type="time"
         value={toTime}
         onChange={(e) => setToTime(e.target.value)}
         InputLabelProps={{
           shrink: true,
         }}
       />
       <Button onClick={()=>handleTimeSlotSubmit()}>Submit Time Slot</Button>
       <Button onClick={()=>handleRefresh()}>Refresh</Button>
       
       {loading ? (
        <p>Loading...</p>
      ) : (
         <TableContainer component={Paper}>
           <Table aria-label="simple table">
             <TableHead>
               <TableRow>
                 <TableCell>Date</TableCell>
                 <TableCell>From Time</TableCell>
                 <TableCell>To Time</TableCell>
                 <TableCell>Status</TableCell>
                 <TableCell>Action</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
              {slots.map((slot) => (
                slot.timeSlots.map((timeSlot) => (
                      <TableRow key={timeSlot._id}>
                        <TableCell component="th" scope="row">
                          {slot.date}
                        </TableCell>
                        <TableCell>{timeSlot.fromTime}</TableCell>
                        <TableCell>{timeSlot.toTime}</TableCell>
                        <TableCell>Pending</TableCell>
                        {/* <TableCell>{slot.accepted ? 'Booked' : 'Pending'}</TableCell> */}
                        <TableCell>
                          <Button onClick={() => handleDeleteEntry(timeSlot._id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))
               ))}
               
             </TableBody>
           </Table>
         </TableContainer>
       )}
</>
  );
 }

export default SlotCreation;

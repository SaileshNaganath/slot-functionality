import React from 'react'
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import SlotCreation from './SlotCreation';
import DatePick from './DatePick';
import TimePick from './TimePick';
import Summary from './Summary';
import TimeSlot from './TimeSlot';
import PaymentConfirm from './PaymentConfirm';

const Index = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/slot" element ={<SlotCreation/>}/>
      <Route path="/slot/:id" element ={<TimeSlot/>}/>
      <Route path="/datepick" element ={<DatePick/>}/>
      <Route path="/selectTime/:id" element ={<TimePick/>}/>
      <Route path="/summary/:id" element ={<Summary/>}/>
      <Route path="/paymentSuccess" element ={<PaymentConfirm/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default Index
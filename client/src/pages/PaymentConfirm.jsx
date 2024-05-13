
import React from 'react'

import { useNavigate,useSearchParams } from "react-router-dom"
const PaymentConfirm = () => {

    const navigate = useNavigate();
    const searchQuery = useSearchParams()[0]

    const referenceNum = searchQuery.get("reference");

    return (
        <div>
         

                <h1> Slot has been Confirmed</h1>

                <div>
                   Payment Reference No.{referenceNum}
                </div>

   <button onClick={() => navigate('/datepick')} >Go to Home</button>
        </div>
    )
}

export default PaymentConfirm
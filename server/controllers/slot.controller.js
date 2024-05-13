const Slot = require('../models/slot.model');

//Create Slot Date
exports.createSlotDate = async (req,res)=>{
    // Validate request body
  //   if (!req.body.date || !req.body.fromTime || !req.body.toTime) {
  //     return res.status(400).send({ message: "Date, fromTime, and toTime are required." });
  // }
  const slotObject={
      date:req.body.date,
  }

  try{
      const slot = await Slot.create(slotObject);
     

      res.status(201).send(slot);
  }
  catch(e){
      console.log(e.message);
     
  }
}
//Create Time Slot
exports.createTimeSlot = async (req,res)=>{
      // Validate request body
    //   if (!req.body.date || !req.body.fromTime || !req.body.toTime) {
    //     return res.status(400).send({ message: "Date, fromTime, and toTime are required." });
    // }
    try{
        const existingSlot = await Slot.findById(req.params.id);

    const slotObject={
        timeSlots:[{
            fromTime:req.body.fromTime,
            toTime:req.body.toTime,
            stock:1,
            accepted:true,
        }]
        
    }

        existingSlot.timeSlots.push(slotObject.timeSlots[0]);
        const updatedSlot = await existingSlot.save();
        
        res.status(201).send(updatedSlot);
    }
    catch(e){
        console.log(e.message);
       
    }
}

//Get all slots
exports.getSlots = async(req,res)=>{

    try{
        Slot.find().sort({date:-1}).then(items => res.json(items)); 
    }
    catch(e){
        console.log(e.message)
    }
}



//Delete slot based on name
exports.deleteSlot = async(req,res)=>{
 
    try{
        await Slot.deleteOne({
            _id:req.params.id
        }) 
        res.status(200).send({
            message:"Successfully deleted the slot"+ req.params.id + ""
        })
    }
    catch(e){
        console.log(e.message);
    }
}

//Delete slot based on name
exports.deleteTimeSlot = async(req,res)=>{
    const entryId = req.params.id;

    try {
        // Find the entry by its ID
        let entryToDelete = await Slot.findOne({ 'timeSlots._id': entryId });

        // If entry is not found, return 404 error
        if (!entryToDelete) {
            return res.status(404).json({ message: "Entry not found" });
        }

        // Remove the entry from the timeSlots array
        entryToDelete.timeSlots = entryToDelete.timeSlots.filter(timeSlot => timeSlot._id.toString() !== entryId);

        // Save the updated entry
        entryToDelete = await entryToDelete.save();

        // Send response with success message and updated entry
        res.status(200).json({ message: "Entry deleted successfully"});
    }
    catch(e){
        console.log(e.message);
    }
}


//Get slot by date
exports.getSlotByDate = async(req,res)=>{

    try{
        Slot.findById(req.params.id).then(items => res.json(items)); 
    }
    catch(e){
        console.log(e.message)
    }
}
exports.updateSlot = async (req, res) => {
    const selectedSlot = req.params.id;
    try {
        // Find the existing slot by ID
        let existingSlot = await Slot.findOne({ 'timeSlots._id': selectedSlot });

        // Find the selected time slot array within existingSlot
        const selectedTimeSlot = existingSlot.timeSlots.find(slot => slot._id.toString() === selectedSlot);

        // Update the stock value of the selected time slot from the request body
        selectedTimeSlot.stock = req.body.stock;

        // Save the updated slot
        const updatedSlot = await existingSlot.save();

        // Respond with the updated slot
        res.status(200).send(updatedSlot);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};



exports.getSummary = async(req,res)=>{

    const selectedSlot = req.params.id;
    try{
        Slot.findOne({ 'timeSlots._id': selectedSlot })  .then(items => {
            // Find the selected time slot array within items
            const selectedTimeSlot = items.timeSlots.find(slot => slot._id.toString() === selectedSlot);
            // Extract date from items and attach it to the selected time slot array
            const selectedTimeSlotWithDate = {
                date: items.date,
                timeSlot: selectedTimeSlot
            };
            // Return the selected time slot array along with the date
            res.json(selectedTimeSlotWithDate);
        })
    }
    catch(e){
        console.log(e.message)
    }
}
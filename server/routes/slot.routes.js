const slotsController = require ("../controllers/slot.controller");


module.exports =function (app){

    app.get("/api/slots",slotsController.getSlots);
    app.get("/api/slot/:id",slotsController.getSlotByDate);
    app.put("/api/slot/:id",slotsController.updateSlot);
    app.get("/api/summary/:id",slotsController.getSummary);
    app.post("/api/slots",slotsController.createSlotDate);
    app.post("/api/slots/:id",slotsController.createTimeSlot);
    app.delete("/api/slots/:id",slotsController.deleteSlot);
    app.delete("/api/timeSlot/:id",slotsController.deleteTimeSlot);
}
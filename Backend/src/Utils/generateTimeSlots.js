
function generateSlots(startTime, endTime, slotDuration, date) {
    let slots = [];

    
    const parseTime = (time) => {
        const trimmedTime = time.trim(); 
        const [hour, minute] = trimmedTime.split(/[: ]/); 
        const isPM = trimmedTime.includes("PM");
        const hour24 = isPM && hour !== "12" ? parseInt(hour) + 12 : !isPM && hour === "12" ? 0 : parseInt(hour);
        return `${hour24.toString().padStart(2, "0")}:${minute}`;
    };
    

    const parsedStartTime = parseTime(startTime); 
    const parsedEndTime = parseTime(endTime); 
    // console.log("Parsed Start Time:", parsedStartTime);
    // console.log("Parsed End Time:", parsedEndTime);

    
    let currentTime = new Date(`${date}T${parsedStartTime}:00`); // Add seconds
    const endTimeObj = new Date(`${date}T${parsedEndTime}:00`); // Add seconds

    // console.log("currentTime:", currentTime, "endTimeObj:", endTimeObj);

    if (isNaN(currentTime.getTime()) || isNaN(endTimeObj.getTime())) {
        console.error("Invalid date or time format!");
        return slots; 
    }

    
    while (currentTime < endTimeObj) {
        let slot = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        slots.push(slot);
        currentTime.setMinutes(currentTime.getMinutes() + slotDuration); 
    }

    return slots;
}


export default generateSlots;
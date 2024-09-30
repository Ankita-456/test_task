const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Slot = require("./models/slotModel")

dotenv.config();
const app = express();

app.use(express.json());

//Get_Slots
app.get("/slot", async (req, res) => {
    try {
        const venue_external_id = req.query.venue_external_id;
        const court_external_id = req.query.court_external_id;
        const dateParam = req.query.date;
        let date;

        if (dateParam) {
            date = new Date(dateParam);
            if (isNaN(date.getTime())) {
                return res.status(400).json({ message: "Invalid date format" });
            }
        } else {
            return res.status(400).json({ message: "Date parameter is required" });
        }
        const startDate = new Date(date.toISOString().split('T')[0] + 'T00:00:00Z');
        const endDate = new Date(date.toISOString().split('T')[0] + 'T23:59:59Z');

        console.log("startDate: ", startDate);
        console.log("endDate: ", endDate);

        const query = {
            ...(venue_external_id && { venue_external_id }),
            ...(court_external_id && { court_external_id }),
            ...(date && {
                slot_start_time: {
                    $gte: startDate,
                    $lt: endDate
                }
            })
        };

        const slots = await Slot.find(query);
        if (!slots || slots.length === 0) {
            return res.status(404).json({ message: 'No slots found for the given criteria' });
        }
        const formattedResponse = {
            message: "Slots fetched successfully!",
            data: slots,
            metadata: {
                venueId: venue_external_id,
                courtId: court_external_id,
                requestedDate: dateParam,
                slotCount: slots.length,
            }
        };
        return res.status(200).json(formattedResponse);
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error, please try again later!" });
    }
});



mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

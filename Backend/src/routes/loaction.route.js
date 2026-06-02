import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/saveLocation", async (req, res) => {
const { lat, lng } = req.body;

if(!lat || !lng){
    return res.status(400).json({ success: false, message: "Latitude and longitude are required." });
}

try {

    const openStreetMapsUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

    const response = await axios.get(openStreetMapsUrl, {
        headers: {'User-Agent': 'MyfoodDeliveryApp/1.0 (contact@mywebsite.com)'}
    });

    if (response.data && response.data.display_name) {
        const accurateAddress = response.data.display_name;
        return res.json({ success: true, address: accurateAddress });
    } else {
        return res.status(404).json({ success: false, message: "address not found." });
    }
    
} catch (error) {
    console.error("Error geocoding:", error.message);
    return res.status(500).json({ success: false, message: "An error occurred while fetching the address." });
}

});

export default router;
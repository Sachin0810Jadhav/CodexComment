const express = require("express");

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("hii")
})


router.post("/generateComment", async (req, res) => {
    const { code } = req.body;
    
    try {
        // Import the Google Generative AI library dynamically
        const { GoogleGenerativeAI } = await import("@google/generative-ai");

        // Initialize the generative AI model with your API key
        const genAI = new GoogleGenerativeAI( process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Define the prompt to generate a comment for the provided code
        const prompt = `Generate a comment for the following code:\n${code}`;

        // Await the AI model's response
        const result = await model.generateContent(prompt);
        

       
        res.json({
            msg: "Comment generated successfully",
            comment: result.response.text(),
        });
    } catch (error) {
        console.log("Error generating comment:", error.message || error);
        res.json({
            msg: "Error generating comment",
            error: error.message,
        });
    }
});



module.exports = router
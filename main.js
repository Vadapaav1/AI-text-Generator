// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// // Set EJS as the view engine
// app.set('view engine', 'ejs');
// // Middleware
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 

// app.get('/', (req,res)=>{
//     res.send("hello,world!");
// })

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const generate = async (prompt) => {
//     try {
//         const result = await model.generateContent( prompt );
//         console.log(result.response.text()); 
//         return result.response.text(); 
//     } catch (err) {
//         console.log(err);
//     }
// };

// app.get('/api/content' , async (req,res) => {
//     try{
//         const data = req.body.question;
//         const result =  await generate(data);
//         res.send({
//             "result" : result
//         })

//     }
//     catch(err){
//         res.send("error:" + err)

//     }
// })


// app.listen(5000, () => {
//     console.log('Server is up and running on port 5000');
// });


//try-2
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Generate content function
const generate = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        console.error(err);
        throw new Error('Error generating content');
    }
};

// Home route
app.get('/', (req, res) => {
    res.render('index', { inputText: '', outputText: '' });
});

// API route to generate content
app.post('/generate', async (req, res) => {
    try {
        const { inputText } = req.body;
        const outputText = await generate(inputText);
        res.render('index', { inputText, outputText });
    } catch (err) {
        res.render('index', { inputText, outputText: 'Error generating content' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is up and running on port 5000');
});

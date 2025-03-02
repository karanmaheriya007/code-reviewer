require('dotenv').config();
const app = require("./src/app"); // Import from app.js

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

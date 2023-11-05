import axios from "axios";
// with out blocking our http request we use ngrok
export default axios.create({
  baseURL: "   https://94b9-27-116-20-30.ngrok-free.app",
  headers: { "ngrok-skip-browser-warning": "true" },
});

// 2WRHUTSYnAv5OdjvgFSTxIN1Wk2_4qC3MEAFyxa1QJEuXSxPL

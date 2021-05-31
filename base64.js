require('dotenv').config();

let data = process.env.spotify_id + ':' + process.env.spotify_secret;
// Create buffer object, specifying utf8 as encoding
let bufferObj = Buffer.from(data, "utf8");

// Encode the Buffer as a base64 string
let base64String = bufferObj.toString("base64");

console.log('"' + data + '" converted to Base64 is "' + base64String + '"');
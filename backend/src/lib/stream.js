import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("Missing Stream API key or secret");
  process.exit(1);
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

// ensure user exists in stream
export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (err) {
    console.log("Error upserting Stream user:", err.message);
  }
};

// generate token
export const generateStreamToken = (userId) => {
  try {
    return streamClient.createToken(userId.toString());
  } catch (err) {
    console.log("Error generating Stream token:", err.message);
  }
};
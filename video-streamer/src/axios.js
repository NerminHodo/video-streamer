import axios from "axios";

// convert to class

export async function GetStreams(setData, streamId) {
  if (streamId) {
    try {
      const response = await axios.get(
        "http://localhost:4000/streams/" + streamId
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const response = await axios.get("http://localhost:4000/streams");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}

export async function GetStreamStatus(setData) {
  try {
    const response = await axios.get("http://localhost:8000/api/streams");
    setData(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function Post({
  id,
  username,
  email,
  streamName,
  streamDetails,
  streamKey,
  date,
}) {
  try {
    axios.post("http://localhost:4000/streams", {
      id: id,
      username: username,
      email: email,
      streamKey: streamKey,
      streamName: streamName,
      streamDetails: streamDetails,
      date: date,
    });
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

export function Update({
  id,
  username,
  email,
  streamName,
  streamDetails,
  streamKey,
  date,
}) {
  axios.put("http://localhost:4000/streams/" + id, {
    id: id,
    username: username,
    email: email,
    streamKey: streamKey,
    streamName: streamName,
    streamDetails: streamDetails,
    date: date,
  });
}

export async function Delete(id) {
  axios.delete("http://localhost:4000/streams/" + id);
}

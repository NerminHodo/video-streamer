import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import StreamCreate from "./components/StreamCreate";
import StreamDelete from "./components/StreamDelete";
import StreamEdit from "./components/StreamEdit";
import StreamList from "./components/StreamList";
import StreamShow from "./components/StreamShow";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import jwtDecode from "jwt-decode";
import { UserContext } from "./components/UserContext";
import { GetStreams, GetStreamStatus } from "./axios";
import Cookies from "js-cookie";
import FlvJs from "flv.js";
import "./css/App.css";

function App() {
  const key = process.env.REACT_APP_CLIENT_ID;
  const [user, setUser] = useState({});
  const [streamsData, setStreamsData] = useState([]);
  const [streamData, setStreamData] = useState({});
  const [statusi, setStatusi] = useState("");
  const [renderVideo, setRenderVideo] = useState(false);
  const [closeStream, setCloseStream] = useState(false);

  const ProviderValue = {
    user,
    streamsData,
    setStreamsData,
    streamData,
    setStreamData,
    renderVideo,
    setCloseStream,
  };

  const location = useLocation();
  const background = location.state && location.state.background;

  // get all streams data

  useEffect(() => {
    GetStreams(setStreamsData);

    //check if any user is logged in
    if (Cookies.get("user") !== undefined) {
      let test = jwtDecode(Cookies.get("user"));
      setUser(test);
      document.getElementById("signInDiv").hidden = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //sort streams by date
  streamsData.sort((a, b) => b.date.localeCompare(a.date));

  //---------google login

  function handleCallbackResponse(response) {
    Cookies.set("user", response.credential, { expires: 0.5 });
    var userObject = jwtDecode(response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut() {
    setUser({});
    Cookies.remove("user");
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
     google.accounts.id.initialize({
      client_id: key,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "medium",
      shape: "pill",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //-------stream load

  var flvPlayer = FlvJs.createPlayer({
    type: "flv",
    url: `http://localhost:8000/live/${streamData.streamKey}.flv`,
  });

  // function close() {
  //   flvPlayer.unload();
  //   flvPlayer.detachMediaElement();
  //   console.log("Close stream");
  // }

  function stream(status) {
    if (status.live !== undefined)
      for (let [key, value] of Object.entries(status.live)) {
        if (key === streamData.streamKey) {
          setRenderVideo(true);
          if (FlvJs.isSupported()) {
            var videoElement = document.getElementById("videoElement");

            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();

            //  Listen for error events
            flvPlayer.on(FlvJs.Events.ERROR, (err, errdet) => {
              //  Parameters  err  It's a level 1 exception ,errdet  It's a level 2 exception
              if (err === FlvJs.ErrorTypes.MEDIA_ERROR) {
                console.log(" Media error ");
                if (errdet === FlvJs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
                  console.log(" Media format does not support ");
                }
              }
              if (err === FlvJs.ErrorTypes.NETWORK_ERROR) {
                console.log(" Network error ");
                if (errdet === FlvJs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
                  console.log("http Status code exception ");
                }
              }
              if (err === FlvJs.ErrorTypes.OTHER_ERROR) {
                console.log(" Other anomalies ：", errdet);
              }
            });

            flvPlayer.on(FlvJs.Events.METADATA_ARRIVED, () => {
              console.log(" Video loading complete ");
            });

            var playPromise = videoElement.play();

            if (playPromise !== undefined) {
              playPromise
                .then((_) => {})
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        } else setRenderVideo(false);
      }
  }

  useEffect(() => {
    GetStreamStatus(setStatusi);
    stream(statusi);
  }, [streamData]);

  return (
    <div className="container App">
      <UserContext.Provider value={ProviderValue}>
        <Header handleSignOut={handleSignOut} />
        <Routes location={background || location}>
          <Route path="/" element={<StreamList />} />

          <Route
            path="streamCreate"
            element={
              <ProtectedRoute>
                <StreamCreate />
              </ProtectedRoute>
            }
          />

          <Route path="streamEdit" element={<Layout />}>
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <StreamEdit />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="streamShow" element={<Layout />}>
            <Route path=":id" element={<StreamShow />} />
          </Route>
        </Routes>
        {background && (
          <Routes>
            <Route
              path="streamDelete/:id"
              element={
                <ProtectedRoute>
                  <StreamDelete />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;

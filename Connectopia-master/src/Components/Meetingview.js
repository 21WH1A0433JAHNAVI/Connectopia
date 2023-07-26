import { useMeeting } from "@videosdk.live/react-sdk";
import GraphPlotter from "./Graphplotter";
const MeetingView = () => {
  const {localMicOn, enableWebcam, disableWebcam, toggleWebcam,  unmuteMic, muteMic, toggleMic } = useMeeting();

  const handleEnableWebcam = () => {enableWebcam();};
  const handleDisableWebcam = () => {disableWebcam();};
  const handleToggleWebcam = () => {toggleWebcam();};
  const handleUnmuteMic = () => {unmuteMic();};
  const handleMuteMic = () => {muteMic();};
  const handleToggleMic = () => {toggleMic();};

  return (
    <>
      <button onClick={handleEnableWebcam}>Enable Webcam</button>
      <button onClick={handleDisableWebcam}>Disable Webcam</button>
      <button onClick={handleToggleWebcam}>Toggle Webcam</button>
      <button onClick={handleMuteMic}>Mute Mic</button>
      <button onClick={handleUnmuteMic}>Unmute Mic</button>
      <button onClick={handleToggleMic}>Toggle Mic</button>
      Local Mic is {localMicOn}
    </>
  );
};
export default MeetingView
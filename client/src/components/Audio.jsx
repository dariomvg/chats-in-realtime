import { useState, useRef } from "react";
import iconAudio from "../assets/audio.svg";
import iconAudioOff from "../assets/audio-off.svg";
import "../styles/audio.css";

export const Audio = ({submitAudio}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        audioChunks.current.push(e.data);
      }
    };

    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Array.from(new Uint8Array(arrayBuffer));
      await submitAudio(buffer)
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="container-btn-audio">
      {isRecording && <div className="container-reconding">
        <p className="title-record">Grabando audio...</p>
        <span className="record-audio-pin"></span>
      </div>}
      
      {isRecording ? (
        <button type="button" className="btn-chat" onClick={stopRecording}>
          <img src={iconAudioOff} alt="icon audio off" width={25} height={25} />
        </button>
      ) : (
        <button type="button" className="btn-chat" onClick={startRecording}>
          <img src={iconAudio} alt="icon audio" width={25} height={25} />
        </button>
      )}
    </div>
  );
};

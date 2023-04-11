
import React, { useState, useEffect } from "react";
// import "./BlogPost.css";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    synth.addEventListener("voiceschanged", () => {
      const voices = synth.getVoices();
      setVoice(voices[0]);
    });

    return () => {
      synth.cancel();
      synth.removeEventListener("voiceschanged", () => {
        setVoice(null);
      });
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    setIsPaused(true);
    synth.pause();
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    setIsPaused(false);
    synth.cancel();
  };

  const handleVoiceChange = (event) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  const handlePitchChange = (event) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange = (event) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
   
        <div>
        <label>
            Voice:
            <select value={voice?.name} onChange={handleVoiceChange}  className="input_container">
            {window.speechSynthesis.getVoices().map((voice) => (
                <option key={voice.name} value={voice.name}>
                {voice.name}
                </option>
            ))}
            </select>
        </label>
    

        <br />

        <label>
            Pitch:
            <input
             className="input_container"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e)=>handlePitchChange(e)}
            />
        </label>

        <br />

        <label>
            Speed:
            <input
             className="input_container"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e)=>handleRateChange(e)}
            />
        </label>
        <br />
        <label>
            Volume:
            <input
            className="input_container"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e)=>handleVolumeChange(e)}
            />
        </label>

        <br />
        <div className="button-group">
            <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleStop}>Stop</button>
        </div>
        </div>

  );
};

export default TextToSpeech;

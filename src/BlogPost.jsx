import { useState } from "react";
import TextToSpeech from "./TextToSpeech";
import "./BlogPost.css";

const BlogPost = () => {
    const [message, setMessage] = useState('');

    const handleMessageChange = event => {
      setMessage(event.target.value);
    };

  return (
    <form action="#" className="form-container">
      <h1>Text To Speech</h1>
      <div className="text_area">            
        <textarea
        id="message"
        name="message"
        value={message}
        onChange={handleMessageChange}
        className="form_input"
      />
       
        <button onClick={()=>setMessage("")} className="clear_button">Clear</button>
        </div>
      <TextToSpeech text={message} />
    </form>
  );
};

export default BlogPost;
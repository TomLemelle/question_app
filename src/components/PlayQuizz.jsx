import axios from "axios";
import { useEffect, useState } from "react";

const PlayQuizz = () => {

    const [item, setItem] = useState([]);
    const [video, setVideo] = useState('');

    const getApiRows = async () => {
        const res = await axios.get('https://127.0.0.1:8000/api/creates/', {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        setItem(res.data)
        console.log(item)
        const result = await getVideoFromTraceMoe().then((video) => video.data.result[0].video);
        console.log(result.data.result[0].video, 'coucou');
    }

    const getVideoFromTraceMoe = async () => {
         return await axios.get(`https://api.trace.moe/search?url=${encodeURIComponent(
                                    "https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg")}`)
    }

    return (
        <div>
            <button onClick={getApiRows}>Play</button>
            {item.map(item => (
                <>
                    <h1 style={{color: 'white'}}>{item.question}</h1>
                    <ul style={{color: 'white'}}>
                        <li>{item.answersProposed[0]}</li>
                        <li>{item.answersProposed[1]}</li>
                        <li>{item.answersProposed[2]}</li>
                        <li>{item.answersProposed[3]}</li>
                    </ul>

                    
                </>
            ))}

                <video width="320" height="240" controls>
                    <source src={video[0]} type="video/mp4" />
                    <source src={video[0]} type="video/ogg" />
                </video>
        </div>
    )
}

export default PlayQuizz;
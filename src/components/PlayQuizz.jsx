import axios from "axios";
import { useEffect, useState } from "react";

const PlayQuizz = () => {

    const [item, setItem] = useState([]);
    const [video, setVideo] = useState([]);

    const response = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/creates/', {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        setItem(res.data)
        console.log(item)

        const moe = await axios
            .get(`https://api.trace.moe/search?url=${encodeURIComponent(item.imageInfo[1])}`);

        setVideo([moe.data.result[0].video, moe.data.result[1].video]);
        console.log(item)
        console.log(video)
    }

    return (
        <div>
            <button onClick={response}>Play</button>
            {item.map(item => (
                <>
                    <h1 style={{color: 'white'}}>{item.question}</h1>
                    <img src={item.imageInfo[1]} alt="eazeaz" width={400}/>
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
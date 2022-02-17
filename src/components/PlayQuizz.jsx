import { useEffect, useState } from "react";
import axios from 'axios';

const PlayQuizz = () => {
    const [item, setItem] = useState([]);

    const getApiRows = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/creates/', {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        setItem(res.data)
        console.log(item)
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1 style={{color: 'white', fontFamily: 'BloodCrow'}}>Vous voulez jouer ? Cliquer ci-dessous</h1>
            <button className='playquizz-btn' onClick={getApiRows}>Play</button>
            {item.map((item, idx) => (
                <div key={idx} style={{width: '75%'}}>
                    <h1 style={{color: 'white', fontFamily: 'BloodCrow'}}>{item.question}</h1>
                    <img src={item.imageName} alt="eazeaz" width='100%'/>
                    <ul style={{color: 'white', fontFamily: 'Impact', listStyle: "none"}}>
                        <li><input style={{padding: '0.625rem 1.3rem', width: '100%', margin: '0.300rem 0'}} value={item.answersProposed[0]} disabled /></li>
                        <li><input style={{padding: '0.625rem 1.3rem', width: '100%', margin: '0.300rem 0'}} value={item.answersProposed[1]} disabled /></li>
                        <li><input style={{padding: '0.625rem 1.3rem', width: '100%', margin: '0.300rem 0'}} value={item.answersProposed[2]} disabled /></li>
                        <li><input style={{padding: '0.625rem 1.3rem', width: '100%', margin: '0.300rem 0'}} value={item.answersProposed[3]} disabled /></li>
                        <button style={{width: '100%', padding: '0.625rem', border: 'none', cursor: "pointer", margin: '0.300rem 0'}} type='submit'>Valider ma réponse</button>
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default PlayQuizz;
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";
import { storage } from "../firebase/firebase-config";
import uuid from "react-uuid";
import ReactPlayer from 'react-player'

const CreateQuizz = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = useState('');
    const [moeImage, setMoeImage] = useState([]);
    const [token, setToken] = useState('');
    const [progress, setProgress] = useState(0);
    const baseURL = "https://127.0.0.1:8000/api/"

    const onSubmit = async data => {
        try {
            if(image == null) {
                alert("Choisissez au moin une image");
            } else {
//                let newImgName = 'image-' + uuid() + "-" + data.image;
  //              data.imageName = newImgName;
                //console.log('data image info', data.imageName);
                console.log(data)
                data.answersProposed = Object.values(data.answersProposed);
                const asyncCreateQuizz = async () => {
                    const res = await axios.post(baseURL + "creates", data )
                    console.log(res.data);
                }
                asyncCreateQuizz();
            }
        } catch (error) {
            console.error('error occured:' + error)   
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-wrapper">
                <div className="question-input">
                    <input {...register("question", { required:  true})} placeholder="Votre question *" />
                    {errors.question && <span>Ce champ est requis</span>}
                </div>
                <div className="image-input">
                    <input {...register("imageName", { required: true })} placeholder="L'url de votre image" type="text"/>
                    {image && <span>{image.name}</span> }
                    {errors.image && <span>Ce champ est requis</span>}
                </div>

                <div className="answer-input">
                    <input {...register("answer", { required: true })} placeholder="Votre bonne réponse *" />
                    {errors.answer && <span>Ce champ est requis</span>}
                </div>
                
                <div className="answers-input">
                    <div className="top">
                        <input {...register("answersProposed[answerA]", { required: true })} placeholder="Réponse possible n°1 *" />
                        {errors.answerA && <span>Ce champ est requis</span>}
                        <input {...register("answersProposed[answerB]", { required: true })} placeholder="Réponse possible n°2 *" />
                        {errors.answerB && <span>Ce champ est requis</span>}
                    </div>
                    <div className="bottom">
                        <input {...register("answersProposed[answerC]", { required: true })} placeholder="Réponse possible n°3 *" />
                        {errors.answerC && <span>Ce champ est requis</span>}
                        <input {...register("answersProposed[answerD]", { required: true })} placeholder="Réponse possible n°4 *" />
                        {errors.answerD && <span>Ce champ est requis</span>}
                    </div>
                    
                </div>

                <div className="submit">
                    <button type="submit">Créer mon quizz</button>
                </div>
                
                <h3 style={{color: 'white', fontFamily: "sans-serif", marginTop: '10px'}}>Téléchargement: {progress}%</h3>

            </div>


        </form>
    )
}

export default CreateQuizz;
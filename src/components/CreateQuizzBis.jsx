import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";
import ReactPlayer from 'react-player'

const CreateQuizz = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const baseURL = "http://127.0.0.1:8000/api/"
    const [userImageUrl, setUserImageUrl] = useState('')
    const [videoExcerpt, setVideoExcerpt] = useState([])

    const onSubmit = async data => {
        try {
            console.log(data)
            data.answersProposed = Object.values(data.answersProposed);
                const res = await axios.post(baseURL + "creates", data )
                console.log(res.data);
            } catch (e) {
                console.log(e);
            }
       
    }

    const findAnimeAndShowExcerpt = async () => {
        return await axios.get(`https://api.trace.moe/search?url=${encodeURIComponent(userImageUrl)}`)
            .then(videoUrl => {
                setVideoExcerpt(oldArray => [...oldArray, videoUrl.data.result[0].video])
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-wrapper">
                <div className="question-input">
                    <input {...register("question", { required:  true})} placeholder="Votre question *" />
                    {errors.question && <span>Ce champ est requis</span>}
                </div>
                <div className="image-input">
                    <input {...register("imageName", { required: true })} placeholder="L'url de votre image" type="text" onChange={(e) => setUserImageUrl(e.target.value)} onBlur={findAnimeAndShowExcerpt} />
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

                <div className="excerpt">
                    {videoExcerpt?.map((video, idx) => (
                        <ReactPlayer url={video} playing={true} muted={true} loop={true} controls={true} key={idx} width={"100%"} />
                    ))}
                </div>

            </div>
           
        </form>
    )
}

export default CreateQuizz;
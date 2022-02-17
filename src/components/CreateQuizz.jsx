import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";
import { storage } from "../firebase/firebase-config";
import uuid from "react-uuid";

const CreateQuizz = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = useState('');
    const [token, setToken] = useState('');
    const baseURL = "http://127.0.0.1:8000/api/"

    const onSubmit = async data => {
        try {
            if(image == null) {
                alert("Choisissez au moin une image");
            } else {
                let key = data.image[0].name;
                let imgName = {
                    set current(name) {
                        this.log = name;
                    },
                    log: ''
                };
                imgName.current = 'image-' + uuid() + "-" + key;
                setImage(imgName.log);
                const fullImage = data.image[0];
                console.log(fullImage);
                console.group()
                console.log('image name', image)
                console.groupEnd();
                storage.ref(`/images/${image}`).put(data.image[0]).then((el) => {
                    console.log(el)
                    storage.ref(`/images/${image}`).getDownloadURL().then(url => {
                        setToken(url);
                        console.log(url)
                        data.imageInfo = [imgName.log, token];
                        if(data.imageInfo) {
                            data.answersProposed = Object.values(data.answersProposed);
                            const asyncCreateQuizz = async () => {
                                await axios.post(baseURL + "creates", data)
                                    .then(res => {
                                        console.log(res)
                                    })
                            }
                            asyncCreateQuizz();
                        }
                    })
                })
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
                    <label for="file-upload" class="custom-file-upload">
                        Télécharger votre image ( cliquer ) *
                    </label>
                    <input {...register("image", { required: true })} id="file-upload" type="file" />
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
            </div>
        </form>
    )
}

export default CreateQuizz;
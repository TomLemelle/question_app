import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";
import { storage } from "../firebase/firebase-config";
import uuid from "react-uuid";
import ReactPlayer from 'react-player'
import { getDownloadURL, uploadBytesResumable, ref } from "@firebase/storage";
import fileDownload from "js-file-download";
import FileSaver from "file-saver";

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
                let key = data.image[0];
                let newImgName = 'image-' + uuid() + "-" + key.name;
                /*const storageRef = ref(storage, `/files/${newImgName}`)
                const uploadTask = uploadBytesResumable(storageRef, key);
                uploadTask.on("state_changed", (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prog);
                }, (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(url => {
                            axios.get(`https://api.trace.moe/search?url=${encodeURIComponent(url)}`)
                                .then(res => {
                                    console.log('je suis là', res);
                                    const getDataFromURL = (url) => new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            fetch(url)
                                            .then(response => response.text())
                                            .then(data => {
                                                resolve(data);
                                                setFS(FileSaver(data, newImgName))
                                                console.log(FS)
                                            })
                                        })
                                    })
                                    getDataFromURL(res.data.result[0].video)*/
                                    data.imageInfo = [res.data.result[0].video, url];
                                    console.log('data image info', data.imageInfo);
                                    if(data.imageInfo) {
                                        data.answersProposed = Object.values(data.answersProposed);
                                        const asyncCreateQuizz = async () => {
                                            const res = await axios.post(baseURL + "creates", data )
                                            console.log(res.data);
                                        }
                                        asyncCreateQuizz();
                                    }
                                });
                        })
                }
                );
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
                    <input {...register("image", { required: true })} id="file-upload" type="file"/>
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
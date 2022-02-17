import { NavLink } from 'react-router-dom';
import Create from '../pages/Create';
import Play from '../pages/Play';

const HeroBanner = () => {
    return (
        <section className="herobanner">
            <div className="herobanner-baseline">
                <div className="top">Question</div>
                <div className="middle">A quel point es-tu fort sur les animés?</div>
                <div className="bottom">Quizz</div>
            </div>

            <div className="buttons">
                
                <NavLink component={Play} to="/play">
                    <button>Play the quizz</button>
                </NavLink>
                <NavLink component={Create} to="/create">
                    <button>Create a quizz</button>
                </NavLink>
    
            </div>
        </section>
    )
}

export default HeroBanner;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '../pages/Index'
import Create from '../pages/Create'
import Play from '../pages/Play'

const CustomRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' exact element={<Index />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/play' element={<Play />} />
                </Routes>
            </Router>
        </>
    )
}

export default CustomRouter;
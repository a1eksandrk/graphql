import React from 'react'
import CreateLink from './CreateLink'
import Header from './Header'
import LinkList from './LinkList'
import Login from './Login'
import {Route, Routes} from 'react-router-dom'

const App = () => {
    return (
        <div className="center w85">
            <Header/>
            <div className="ph3 pv1 background-gray">
                <Routes>
                    <Route exact path="/" element={<LinkList/>}/>
                    <Route exact path="/create" element={<CreateLink/>}/>
                    <Route exact path="/login" element={<Login/>} />
                </Routes>
            </div>
        </div>
    )
}

export default App

import React from 'react';
import {Routes,Route} from 'react-router-dom';
import './App.css';
// import Home from './component/Home';
import AddPage from './component/AddPage';
import AddProjectPage from './component/AddProjectPage';
import Home from './component/Home';
import ProjectManagement from './component/ProjectManagement';
import AddProjects from './component/AddProjects';

import Chart from './component/Chart';
import ChartEdit from './component/ChartEdit';

function App() {
  return (
    <>
    {/* <Home/> */}
    {/* <AddPage/> */}
    {/* <AddProjectPage/> */}
    <Routes>
     <Route exact path="/" element={<Home />}></Route>
     </Routes>
     <Routes>
    <Route path="/AddProjectPage" element={<AddProjectPage />} ></Route> 
    </Routes>
    <Routes>
    <Route path="/AddProjects" element={<AddProjects />} ></Route> 
    </Routes>
    <Routes>
    <Route path="/AddPage" element={<AddPage />} ></Route> 
    </Routes>
    <Routes>
    <Route path="/ProjectManagement" element={<ProjectManagement />} ></Route> 
    </Routes>
    
    {/* <Routes>
    <Route path="/Chart" element={<Chart/>} ></Route> 
    </Routes> */}
    <Routes>
    <Route path="/ChartEdit" element={<ChartEdit/>} ></Route> 
    </Routes>
    </>
  );
}

export default App;

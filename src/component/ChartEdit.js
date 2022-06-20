import React from 'react'
import { useState,useEffect} from 'react';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {FaRegSave} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Modal,Button } from 'react-bootstrap';
import axios from 'axios';

const ChartEdit = () => {
   
    //--------------Modal---------
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
     const handleShow1 = () => setShow1(true);
     //----------
     const [projectName,setProjectName]=useState('');
     const [id,setID]=useState(null);
      const [taskName,setTaskName]=useState('');
      const [start,setStart]=useState('');
      const [start1,setStart1]=useState('');
      const [status,setStatus]=useState('');
      const [taskOwner,setTaskOwner]=useState('');
      const [priority,setPriority]=useState('');
      const [Description,setDescription]=useState('');
    
      const [errors,setError]=useState('');
      const [submitted, setSubmitted] = useState(false);

      
//--------------------------------task----------
const [APIData, setAPIData] = useState([]);
useEffect(() => {
axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task`)
.then((response) => {
    setAPIData(response.data);
})
}, [])

const setData = (data) => {
let { id,taskName, startDate, startDate1 } = data;
localStorage.setItem('ID', id);
localStorage.setItem('TaskName',  taskName,);
localStorage.setItem('StartDate',startDate );
localStorage.setItem('StartDate1',startDate1);

}

const getData = () => {
axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task`)
   .then((getData) => {
        setAPIData(getData.data);
    })
}

//------------------------------------------------------
const [show2, setShow2] = useState(false);
const handleClose2 = () => setShow2(false);
const handleShow2 = () => setShow2(true);

const [errors1,setError1]=useState('');
const [submitted1, setSubmitted1] = useState(false);

const postData1 = (e) => {
axios.post(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task`, {
 taskName,
 start,
 start1,
 taskOwner,
 status,
 priority,Description
})
}

useEffect(() => {
setID  (localStorage.getItem('ID'));
setTaskName (localStorage.getItem('TaskName'));
setStart  (localStorage.getItem('Start'));
setStart1 ( localStorage.getItem('Start1'));
setTaskOwner (localStorage.getItem('TaskOwner'));
setStatus (localStorage.getItem('Status') );
setPriority (localStorage.getItem('Priority') );
setDescription (localStorage.getItem('Description') );

}, [])

const updateAPIData1 = (e) => {
e.preventDefault();
if(taskName==="" && start=="" && start1=="" &&status==""&& taskOwner==""&&priority==""&&Description==""){
 setError1("Enter the required details");
 return false;
}
if(taskName===""){
 setError1("Enter taskName ");
 return false;
}
if(start===""){
 setError1("Enter startDate");
 return false;
}
if(start1===""){
   setError1("Enter endDate");
   return false;
 }
 if(status===""){
   setError1("Enter Expense Type");
   return false;
 }
 if(taskOwner===""){
   setError1("Enter taskowner");
   return false;
 }
  if(priority===""){
    if(priority==="january"){
      setError("Enter januaary");
      return false;
    }
    if(priority==="Feb22"){
      setError("Enter Feb22");
      return false;
    }
   setError1("Enter priority");
   return false;
 }
  if(Description===""){
   setError1("Enter Description");
   return false;
 }
else{
axios.put(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task/${id}`, {
   taskName,
   start,
   start1,
  
  taskOwner,
  priority,
   status,
   Description
})

setSubmitted1(true);
setError1(false);
handleShow2();

}
}
//------------------------------
const [users, setUsers] = useState([])

    const fetchData = () => {
      fetch("https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setUsers(data)
        })
    }
  return (
   <>
   <div>
         <div className="row mt-2 ">
        <div className="col-2 ms-4">
          <img src="./images/Lexitas-logo-new-gray.png"  alt="logo" width="190px"/>
        </div>
        <div className="col   border-left border-2" width="700px">
          <h5 className="   pt-3 fw-normal" width="100px">PROJECT MANAGEMENT</h5>
        </div>
        <div className="col me-5 d-flex justify-content-end">
            <p className="text-lighter m-2 pt-2">Brooklyn Shimmons</p>
          <img src="./images/girl.jpg" alt="image" class="rounded-circle" width="60px"/>
        </div>
    </div>
        <hr className="hr mt-1"/>
        <div className=" d-flex justify-content-end me-5  ">
          <div className="p-2 lh-1  ">HOME</div>
          <div className="p-2 lh-1 bg-danger text-white">ADD PRODUCT</div>
          <div className="p-2 lh-1">LOGOUT</div>
        </div>

    <div className="bg-secondary mt-2 p-4">
      <div className="bg-white  pb-5  ">
          <div className="mx-5 ">
            <div className="pt-4 ps-1  row pb-3">
                <div className="col d-flex justify-content-between">
            
                  <h5 className="fw-normal ">Add Task for Project <span class="fw-bolder">{localStorage.getItem("ProjectName")}  </span></h5>
                 
               <NavLink to="/">
                  <button className="btn  bg-secondary ms-2 text-white rounded-0" type="text"><AiOutlineArrowLeft class=" me-2"></AiOutlineArrowLeft>Back</button>
                  </NavLink>
              
                </div>
            </div>

         
              
            <div className="row   gap-1 pb-2">
              <div className="col-5 ">
                  <form>
                    <label  className="form-label">Task Name</label>
                    <input type="text" class="form-control rounded-0 outline" value={taskName} onChange={(e)=>setTaskName(e.target.value)} ></input>
            </form>
            </div>
          
            <div className="col Date ">
                <label  className="form-label ms-2">Start Date</label>
                    <div className="input-group date " id="outlines">
                      <input type="date" className="form-control rounded-0 pt-2 input-group  outline  px-1" placeholder="DD-MM-YYYY" id="outlines" value={start} onChange={e=>setStart(e.target.value)}/>
                    </div>
              </div>
              <div className="col ">
                <label  className="form-label">End Date</label>
                    <div className="input-group date" >
                      <input type="date" className="form-control rounded-0 pt-2 ms-1 pe-1 input-group border outline pt-1 px-1" placeholder="DD-MM-YYYY" value={start1} onChange={e=>setStart1(e.target.value)}/>
                     
                  </div>
              </div>

            <div className="col ">
                <label  className="form-label">Status </label>
                <select className="form-select rounded-0 ms-2 pe-5" value={status} onChange={e=>setStatus(e.target.value)}>
                <option selected disabled > Select </option>
                            <option >Active</option>
                            <option >Delayed</option>
                            <option >Completed</option>
                            <option >Not Started</option>
                  </select>
              </div>
              </div>    

              <div className="row    pb-2">
                <div className="col-2 me-1">
                    <label  className="form-label">Task Owner</label>
                    <select className="form-select rounded-0 border-none" aria-label="Default select example" id="task"  value={taskOwner} onChange={(e)=>setTaskOwner(e.target.value)}>
                      <option selected> Ethen Hawk</option>
                      <option >Jone Cooper</option>
                      <option >Wade Warren</option>
                      <option >Ethen Hawk</option>
                      </select>
                  </div>
                  <div className="col-2 ms-5 ">
                    <label  className="form-label">Priority</label>
                    <select className="form-select rounded-0 border-none" aria-label="Default select example" id="task" value={priority} onChange={(e)=>setPriority(e.target.value)}>
                      <option selected> Ethen Hawk</option>
                      <option >2</option>
                      <option>4</option>
                      <option >8</option>
                     
                      </select>
                  </div>
              <div className="col ps-3 ms-5 ">
                <label  className="form-label ms-2">Description</label>
                <textarea type="text" class="form-control pb-5 ms-2  rounded-0 " value={Description} onChange={(e)=>setDescription(e.target.value)} ></textarea>
            </div>
          </div>
                    
                <div className="row pb-5">
                    <div className=" d-flex justify-content-end pt-3  pe-2 ps-5 ms-5">
                    <button className="btn  bg-warning ms-2 me-2 text-white rounded-0" type="button" onClick={updateAPIData1}><FaRegSave className="me-2" size={20}></FaRegSave>SAVE</button>
                 <NavLink to='/Chart'>   <button className="btn  bg-warning ms-2 me-5 text-white rounded-0" type="button"  ><AiOutlinePlus className=" me-2" size={20}></AiOutlinePlus>SAVE & ADD NEW TASK</button></NavLink>
                </div> 
                {<p className='text-danger'> {errors}</p>}
            </div>
           
 

        </div>
    </div>
</div>
</div>
<Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                           <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                      <Modal.Body>data submitted successfully</Modal.Body>
                      <Modal.Footer>
                      <NavLink to='/'>   <a> <Button id="yes" onClick={handleClose2}>
                        Yes
                        </Button></a>
                        </NavLink>
                    
                      </Modal.Footer>
                       </Modal> 
   </>
  )
}

export default ChartEdit
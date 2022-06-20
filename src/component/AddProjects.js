import React from 'react'
import { useEffect } from 'react';
import { Modal,Button } from 'react-bootstrap';
import { useState } from 'react';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {FaRegSave} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddProjects = () => {
   
//-------------Date----------
    const[date,setDate]=useState();
    console.log("Date",date);
    const[date1,setDate1]=useState();
    console.log("Date1",date1);
    //-------mutliselect--------
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: 'Ethen Hawk', label: 'Ethen Hawk' },
    { value: 'Jone Cooper', label: 'Jone Cooper' },
    { value: 'Wade Warren', label: 'Wade Warren' },
  ];
  //----------------Modal-------------

  const [show1, setShow1] = useState(false);
const handleClose1 = () => setShow1(false);
 const handleShow1 = () => setShow1(true);
//-------------Postdata----------------
 const [id,ID]=useState();
 const ProjectID=useState('id');
console.log("projectId")
//  const [pid,setPid]=useState();
  const [projectName,setProjectName]=useState('');
  const [startDate,setStartDate]=useState('');
  const [startDate1,setStartDate1]=useState('');
  const [projectManager,setProjectManager]=useState('');
  const [status,setStatus]=useState('');
  const [projectMembers,setProjectMembers]=useState('');
  const [Description,setDescription]=useState('');

  const [errors,setError]=useState('');
  const [submitted, setSubmitted] = useState(false);
   console.log(projectName);
   console.log(startDate);
   console.log(startDate1);
   console.log(projectManager);
   console.log(status);
 
   const {projectid}=useParams();
   console.log(projectid)

  const postData = (e) => {
    e.preventDefault();
    if(projectName==="" && startDate==="" && startDate1==="" && projectManager===""&&status===""&&projectMembers==""&&Description==""){
      setError("Enter the required details");
      return false;
    }
    if(projectName===""){
      setError("Enter projectName ");
      return false;
    }
     if(startDate===""){
      setError("Enter startDate");
      return false;
    }
     if(startDate1===""){
      setError("Enter endDate");
      return false;
    }
    if(projectManager===""){
      setError("Enter projectManager ");
      return false;
    }
    if(status===""){
      setError("Enter status ");
      return true;
    }
    // if(projectMembers===""){
    //   setError("Enter projectMembers ");
    //   return false;
    // }
    if(Description===""){
      setError("Enter Description ");
      return false;
    }
  else{
    axios.post(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/project`, {
      
    projectName,
    startDate,
      startDate1,
      projectManager,
      status,
      projectMembers,
      Description
    })
  
    setSubmitted(true);
    setError(false);
    handleShow1();
 
   }
  }
  
  return (
    <>
    <div className='text'>
     <div className="row mt-2 ">
        <div className="col-2 ms-4">
          <img src="./images/Lexitas-logo-new-gray.png"  alt="logo" width="190px"/>
        </div>
        <div className="col   border-left border-2" >
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
              <div className="pt-3 ps-1  row pb-2">
                  <div className="col d-flex justify-content-between">
                    <h5 className="fw-normal ">Add  Project</h5>
                  <NavLink to="/">
                      <button className="btn  bg-secondary ms-2 text-white rounded-0" value="projectName" type="text"><AiOutlineArrowLeft className=" me-2"></AiOutlineArrowLeft>Back</button>
                      </NavLink>
                  </div>
              </div>
              
             
                  <div className="row pb-2">
                         <form>
                            
                          <label  className="form-label">Project Name</label>

                   <input type="text" className="form-control rounded-0 outline" value={projectName} onChange={(e)=>setProjectName(e.target.value)}/>
                    
                        </form>
               
                      </div>
                      <div className="row pb-2 gap-1">
                        
                      <div className="col-2">
                          <label  className="form-label">Start Date</label>
                          <div className="input-group date " >
                      <input type="date" className="form-control input-group rounded-0 pt-2 px-1"  placeholder="DD-MM-YYYY" id="outlines"  onChange={e=>setStartDate(e.target.value)}/>
                    
                    </div>
                        </div>
                        <div className="col-2 ">
                        <label  className="form-label">End Date</label>
                    <div className="input-group date" >
                      <input type="date" data-provide="datepicker" className="form-control   input-group rounded-0  pt-2 px-1 lg-1"  placeholder="DD-MM-YYYY" data-date-format="dd-mm-yyyy" onChange={e=>setStartDate1(e.target.value)}/>
                  </div>
                        </div>
                     
                        <div className="col-3 ">
                          <label  className="form-label">status</label>
                          <select className="form-select rounded-0 outline border border-1 ps-1"  aria-label="Default select example"  onChange={(e)=>setStatus(e.target.value)}>
                          <option selected disabled > Select </option>
                            <option >Active</option>
                            <option >Delayed</option>
                            <option >Completed</option>
                            <option >Not Started</option>
                            </select>
                        </div>
                        <div className="col ">
                          <label  className="form-label">Division</label>
                          <select className="form-select rounded-0 outline" aria-label="Default select example" >
                              <option selected> Ethen Hawk</option>
                              <option >Jone Cooper</option>
                              <option >Wade Warren </option>
                              <option>Ethen Hawk</option>
                            </select>
                        </div>  
                        <div className="col ">
                          <label  className="form-label">Project Manager</label>
                          <select className="form-select rounded-0 outline border pe-5"  type="text" placeholder=" " aria-label="Default select example"  onChange={e=>setProjectManager(e.target.value)}>
                            <option > Ethen Hawk</option>
                            <option >Jone Cooper</option>
                            <option >Wade Warren</option>
                            <option >Ethen Hawk</option>
                            </select>
                        </div>
                      </div>

                      <div className="row  ">
                                    
                        <div className="col-4 ">
                            <label  className="form-label">Project Members</label>
                        <div className='rounded-0  border' >   <Select type="text" className=' '  onChange={setSelectedOption} options={options} isMulti={options} /></div> 
                             {/* <Select type="text" className=' '  onChange={(e)=>setProjectMembers(e.target.value)} options={options} isMulti={options} /> */}
                        </div>
                       
                        <div className="col-8  ">
                            <label  className="form-label ms-2" >Description</label>
                            <textarea type="text" className="form-control pb-5  rounded-0 ms-1" onChange={(e)=>setDescription(e.target.value)} ></textarea>
                        </div>

                    </div>
 {<p className='text-danger'> {errors}</p>}
                    <div className="row pb-3">
                      <div className=" d-flex justify-content-end pt-3  pe-5 ps-5 ms-5">
                      <NavLink to="/ProjectManagement"><button class="btn  bg-warning ms-2 me-2 text-white rounded-0" id="save" onClick={postData} type="submit"><FaRegSave className="fa-solid fa-floppy-disk me-2" size={20}></FaRegSave>SAVE</button></NavLink>
                      {/* <NavLink to="/AddPage"> <button class="btn  bg-warning ms-2 me-5 text-white rounded-0"  type="submit"><AiOutlinePlus className=" me-2" size={20}></AiOutlinePlus> TASK</button></NavLink> */}
                      {/* <NavLink to ={`/AddPage/${users.id}`}><button class="btn  bg-warning ms-2 me-5 text-white rounded-0"  type="submit"><AiOutlinePlus className=" me-2" size={20}></AiOutlinePlus> TASK</button> </NavLink> */}
                  </div> 
                 
              </div>   
                        
               

  </div>
</div>             
</div>
</div>
<Modal show={show1} onHide={handleClose1}>
 <Modal.Body>Data submitted successfully
   <NavLink to='/'>
     <span>  <Button id="yes" onClick={handleClose1}> Yes </Button></span>   
   </NavLink>
   </Modal.Body>
   </Modal> 
    </>
  )
}
 

export default AddProjects
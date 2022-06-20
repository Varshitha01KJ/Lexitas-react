import React from 'react'
import { Modal,Button,OverlayTrigger,Tooltip } from 'react-bootstrap';
import {FaArrowsAltH} from 'react-icons/fa';
import {AiOutlineBarChart} from 'react-icons/ai';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import {RiLayoutGridLine} from 'react-icons/ri';
import {BsThreeDotsVertical} from 'react-icons/bs';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import {RiArrowDropDownLine} from 'react-icons/ri';
import {Select} from 'react-select';
import axios from 'axios';

const ProjectManagement = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [deleteId,setDeleteId]=useState("");
    const handleShow = (info) =>  {
      setShow(true);
      setDeleteId(info);
    }
   //-----------------------getProject Name-----
   const [projectName,setProjectName]=useState('');
    const [startDate,setStartDate]=useState('');
    const [startDate1,setStartDate1]=useState('');

   const [id,setID]=useState(null);
  //  const [projectid,setProjectID]=useState();
    const [taskName,setTaskName]=useState('');
    const [start,setStart]=useState('');
    const [start1,setStart1]=useState('');
    const [status,setStatus]=useState('');
    const [taskOwner,setTaskOwner]=useState('');
    const [priority,setPriority]=useState('');
    const [Description,setDescription]=useState('');
  
    const [errors,setError]=useState('');
    const [submitted, setSubmitted] = useState(false);
  
     useEffect(() => {
      setID  (localStorage.getItem('ID'));
     setProjectName (localStorage.getItem('ProjectName'));
     setStartDate  (localStorage.getItem('StartDate'));
     setStartDate1 ( localStorage.getItem('StartDate1'));
      setStatus (localStorage.getItem('Status') );
  }, [])
  
    const updateAPIData = (e) => {
      e.preventDefault();
      if(projectName==="" && startDate=="" && startDate1=="" && status==""){
        setError("Enter the required details");
        return false;
      }
    else{
      axios.put(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/project/${id}`, {
        projectName,
        startDate,
        startDate1,
        status,
       })
    
      setSubmitted(true);
      setError(false);
      handleShow();
   }
    }
  
   //------------------task --------------------
    
     const [APIData, setAPIData] = useState([]);
   
     useEffect(() => {
      const ProjectID = localStorage.getItem('ProjectID');
      console.log('chart prId',ProjectID)
     axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task`)
     .then((response) => {
      let taskItems = [];
      response?.data.map((item, key) =>{
        if(item.projectID===ProjectID){
          taskItems.push(item)
        }
        console.log('item',item)
      
      })
      console.log('taskItems',taskItems)
      console.log('response.data task',response.data)
         setAPIData(taskItems);
     })
     }, [])

   
  //  const [select,setSelect]=useState( ' ')
  //  const handleSelect = (e) => {
  //     setSelect(e.target.value);
  //     console.log('select',select)
  //   };
  //   const filteredSelect = APIData.filter((data) =>
  //     data.select.toLowerCase().includes(select.toLocaleLowerCase())
  //   );
    
//--------------------------------------------------------------------
   const [APIData1, setAPIData1] = useState([]);
   console.log(APIData1)
   useEffect(() => {
    const ProjectID = localStorage.getItem('ProjectID');
    // alert(ProjectID)
      console.log('chart prId',ProjectID)
   axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/project`)
  
   .then((response) => {
       setAPIData1(response.data);
       console.log(response.data);
   })
 }, [])

 useEffect(() => {
  const ProjectID = localStorage.getItem('ProjectID');
console.log('ProjectID',ProjectID);
}, []);

   const setData = (data) => {
    let { ProjectID,id,taskName, start, start1,taskOwner,priority } = data;
    localStorage.setItem('ProjectID', id);
    // console.log('ProjectID')
    // alert(taskName)
    localStorage.setItem('ID', id);
    // alert(id)
    localStorage.setItem('TaskName',  taskName,);
    localStorage.setItem('Start',start );
    localStorage.setItem('Start1',start1);
    localStorage.setItem('TaskOwner',taskOwner);
    localStorage.setItem('Priority',priority);
  }

  //getProjectByStatus
  const getProjectByStatus = (e) => {
    // alert(e.target.value)
  console.log('projectId',e.target.value)
  const ProjectStatus = e?.target?.value;
  const ProjectID = localStorage.getItem('ProjectID');
  console.log('chart prId',ProjectID)
  localStorage.setItem('ProjectID',ProjectID);
  axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task`)
  .then((response) => {
  let taskItems = [];
  response?.data.map((item, key) =>{
    if(item.projectID===ProjectID &&item.status===ProjectStatus){
      taskItems.push(item)
    }
    console.log('item',item)
  
  })
  console.log('taskItems',taskItems)
  console.log('response.data task',response.data)
     setAPIData(taskItems);
  })
  }
//getProject-------------
const getProjectById = (e) => {
  // alert(e.target.value)
console.log('projectId',e.target.value)
const ProjectID = e?.target?.value;
console.log('chart prId',ProjectID)
localStorage.setItem('ProjectID',ProjectID);
axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task`)
.then((response) => {
let taskItems = [];
response?.data.map((item, key) =>{
  if(item.projectID===ProjectID){
    taskItems.push(item)
  }
  console.log('item',item)

})
console.log('taskItems',taskItems)
console.log('response.data task',response.data)
   setAPIData(taskItems);
})
}
  
const getData = () => {
    axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task`)
        .then((getData) => {
             setAPIData(getData.data);
         })
  }
  const onDelete = (id) => {
  axios.delete(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task/${id}`)
  .then(() => {
  getData();
  })
  }
 //--------------------------

  return (

   <>
   <div className="horizontal">
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

    <div className="bg-secondary mt-2 px-4 pt-4">
        <div className="bg-white    ">
            <div className="pt-4 ps-5 pe-1 row ">
                <div className="col d-flex justify-content-between">
                  <h5 className="fw-normal ps-1 ">Project </h5>
                  <div className="col d-flex justify-content-end pe-4">
                  <NavLink to="/">
                      <button className="btn  bg-secondary ms-2 text-white rounded-0 me-2" value="projectName" type="text"><AiOutlineArrowLeft className=" me-2"></AiOutlineArrowLeft>Back</button>
                      </NavLink>
                 
                </div>
                </div>
            </div>

         <div className="pt-1 ">
           <form className="row g-2  ps-5 pb-3" > 
            <div className="col-4 me-3 ">
          
           
                <label  className="form-label">Project Name</label>
               
                <select className="form-select rounded-0 " onChange={(e)=>getProjectById(e)} aria-label="Default select example" >
                { (APIData1.map((data)=>{
                 return(
                   <>
                   <RiArrowDropDownLine/>
                  {/* <Select options={data.projectName}/> */}

                   <option value={data.id} > {data.projectName}  </option>
        
                    </>
               )}))
}
</select>

               </div> 
               <div className="col-2  ">
                <label  className="form-label">Status</label>
                {/* <input type="text" className="form-control rounded-0 outline" value={status} onChange={handleSelect} onChange={(e)=>setStatus(e.target.value)}/> */}
              
                <select className="form-select rounded-0"  onChange={(e)=>getProjectByStatus(e)} aria-label="Default select example">
                           <option value={'All'}>All</option>
                           <option  value={'Active'}>Active</option>
                            <option  value={'Delayed'}>Delayed</option>
                            <option  value={'Completed'}>Completed</option>
                            <option  value={'Not Started'}>Not Started</option>
                  </select>
               </div>   
               </form>
               </div>
          
            <div className="bg-secondary  px-0 pt-3">
                <div className="bg-white  pb-3  ">
                   <div className="row ms-5 pt-3">
                       <div className="col-3">
                           <h6 className="fw-bold">Project Name
                               <br/><p class="fw-lighter"> {localStorage.getItem("ProjectName")}</p>
                           </h6>
                       </div>
                       <div className="col-1 pe-1">
                        <h6 className="fw-bold">Start Date <br/><p className="fw-lighter"> {localStorage.getItem("StartDate")}</p></h6>
                    </div>
                    <div className="col-1 pe-1">
                        <h6 className="fw-bold">End Date <br/> <p className="fw-lighter">{localStorage.getItem("StartDate1")}</p></h6>
                    </div>
                    
                    <div className="col-7 pe-5 g-2">
                        <div className="d-flex justify-content-end">
                            <div className="d-flex justify-content-between">
                        <button className="btn  rounded-pill px-4 me-2 text-white" id="btn-active">Active</button>   
                        <button className="btn rounded-pill px-4 text-centre me-2 text-white" id="delayed">Delayed</button>
                    
                        <button className="btn bg-secondary rounded-pill me-2 text-white">Not Started</button>
                   
                        <button className="btn bg-success rounded-pill me-2 text-white">Completed</button>
                    
                       <AiOutlineBarChart size={35} className="bg-warning text-white"/>
                        <RiLayoutGridLine className=" text-secondary border border-warning fa-2x ps-1 pe-1" size={35}/>
                        
                        
                    </div>
                   </div>
                </div>
                </div>

                <div className="pt-3 pb-5">
                <div className="chart ">
                    <div className="chart-row chart-period ">
                        <div className="chart-row-item"></div>
                        <span>Jan22</span><span>Feb22</span><span>Mar22</span>
                        <span>Apr22</span><span>May22</span><span>Jun22</span>
                        <span>Jul22</span><span>Aug22</span><span>Sep22</span>
                        <span>Oct22</span><span>Nov22</span><span>Dec22</span>
                    </div>
                    <div className="chart-row chart-lines">
                      <span ></span><span></span><span></span>
                      <span></span><span></span><span></span>
                      <span></span><span></span><span></span>
                      <span></span><span></span><span></span>
                    </div>
        {/* const SelectList=({filteredSelect})=>{
          
        } */}
                    { APIData.length>0?
                (APIData.map((data)=>{
                    const sd=data.start;
                    const ed=data.start1;
                    // const sday = new Date (sd).getDate();
                    var s=new Date (sd).getMonth();
                    var e=new Date(ed).getMonth();
                    var today=new Date().getDate();
                    console.log(today)

                    var d1 = new Date(sd);   
                    var d2 = new Date(ed);   
                    var diff = d2.getTime() - d1.getTime();   
                    var daydiff = diff / (1000 * 60 * 60 * 24);   
                    return(
                        <>
                       
                    <div className="chart-row" key={data.id}>  
                        <div className="chart-row-item  statusBar">
                            <div className="dropdown  rounded-pill m-2 pb-4 position-relative statusBar border " value={data.status}  data-bs-toggle="dropdown">
                             <div className="float-start ms-4 ">   <BsThreeDotsVertical size={20} />{data.taskName}</div> <br/> 
                          <div className="float-start ms-4">   {data.start} <FaArrowsAltH/>{data.start1} {data.taskowner}</div>
                          </div>
                                <div className="dropdown-menu bg-secondary lh-1 input-sm p-auto text-centre ms-5">
                                    <NavLink to='/ChartEdit' className="text-white text-decoration-none ms-4"  onClick={() => setData(data)}>Edit</NavLink><hr/>
                                    <div href="" class="text-white text-decoration-none ms-4" onClick={()=>{handleShow(data.id)}}>Delete</div>
                              </div>   
                            </div> 
                        <ul className="chart-row-bars">
                            {/* <div className="position-relative rounded-pill  statusBar" style={{gridColumn:`${s+1}/${e+2}`}} value={data.status}/> */}
                               <OverlayTrigger value={data.status} className="statusBar"
        delay={{ hide: 450, show: 300 }}
        overlay={(props) => (
          <Tooltip {...props}  >
           {data.taskName} <br/>
         Duration:{daydiff} Days
          </Tooltip>
        )}
        placement="right">
      <div className="position-relative rounded-pill ps-2 statusBar text-white pt-2" style={{gridColumn:`${s+1}/${e+2}`}} value={data.status}>{daydiff}</div> 
      </OverlayTrigger>
                        
                      </ul>
                    </div>
                
                </>
                )}
                )):(<tr>
                   <td className='text-warning text-center fw-bold'>No Records found</td> <td></td> <td></td><td></td><td></td>
                  <td></td>  
                </tr>)
         }  
         </div>
        
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                           <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                      <Modal.Body>Sure to delete?</Modal.Body>
                      <Modal.Footer>
                      <a onClick={handleClose}> <Button id="yes" onClick={() => onDelete(deleteId)}>
                        Yes
                        </Button></a>
                     <Button id="no" onClick={handleClose}>
                         No
                      </Button>
                      </Modal.Footer>
                       </Modal> 
              </div>
            </div>
            </div>
        </div>
   </div>
</div>
   </>
  )
}

export default ProjectManagement
import React from 'react'
import { Table,Modal,Button } from 'react-bootstrap'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {FaArrowsAltH} from 'react-icons/fa';
import {AiOutlineBarChart} from 'react-icons/ai';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import {RiLayoutGridLine} from 'react-icons/ri';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {BsThreeDotsVertical} from 'react-icons/bs'

const Chart = () => {
    const[date,setDate]=useState();
    console.log("Date",date);
    const[enddate,setEndDate]=useState();
    console.log("EndDate",enddate);


    const [projectName,setProjectName]=useState('');
    const [startDate,setStartDate]=useState('');
    const [startDate1,setStartDate1]=useState('');

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
     //------------------------project--------------
      const postData = (e) => {
       axios.post(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/project`, {
         projectName,
         startDate,
         startDate1,
         status,
       })
      }
   
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
   
     //------------------------task---------------
     const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [deleteId,setDeleteId]=useState("");
    const handleShow = (info) =>  {
      setShow(true);
      setDeleteId(info);
    }

     const [APIData, setAPIData] = useState([]);
     useEffect(() => {
     axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/task`)
     .then((response) => {
         setAPIData(response.data);
     })
   }, [])

   const [APIData1, setAPIData1] = useState([]);
   useEffect(() => {
   axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/project`)
   .then((response) => {
       setAPIData1(response.data);
   })
 }, [])

   const setData = (data) => {
    let { id,taskName, start, start1,taskOwner,priority } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('TaskName',  taskName,);
    localStorage.setItem('Start',start );
    localStorage.setItem('Start1',start1);
    localStorage.setItem('TaskOwner',taskOwner);
    localStorage.setItem('Priority',priority);
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
//----------------chart--------------
  const sd=APIData.startDate;
  const ed=APIData.startDate1;
  const sday = new Date (sd).getDate();
  var s=new Date (sd).getMonth();
  var e=new Date(ed).gerMonth();
  var today=new Date().getDate();
  console.log(today)
  //------------------------------------------------------

  
  return (
   <>
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
                  <div className="col d-flex justify-content-end">
                  <NavLink to="/">
                      <button className="btn  bg-secondary ms-2 me-5 mx-5 text-white rounded-0" value="projectName" type="text"><AiOutlineArrowLeft className=" me-2"></AiOutlineArrowLeft>Back</button>
                      </NavLink>
                 
                </div>
                </div>
            </div>

         <div className="pt-1 ">
           <form className="row g-2  ps-5 pb-3" > 
            <div className="col-4 me-3 ">
                <label  className="form-label">Project Name</label>
                <input type="text" className="form-control rounded-0 outline" value={projectName} onChange={(e)=>setProjectName(e.target.value)}/>
                {/* <select className="form-select rounded-0" aria-label="Default select example">
                    <option selected> Project 1 Leinbeurg </option>
                    <option selected> Ethen Hawk</option>
                    <option value="1">Jone Cooper</option>
                    <option value="2">Wade Warren</option>
                    <option value="3">Ethen Hawk</option>
                  </select> */}
               </div> 
               <div className="col-2  ">
                <label  className="form-label">Status</label>
                <input type="text" className="form-control rounded-0 outline" value={status} onChange={(e)=>setStatus(e.target.value)}/>
                {/* <select className="form-select " aria-label="Default select example">
                    <option selected> Ethen Hawk</option>
                      <option value="1">Jone Cooper</option>
                      <option value="2">Wade Warren</option>
                      <option value="3">Ethen Hawk</option>
                  </select> */}
               </div>   
               </form>
               </div>
          
            <div className="bg-secondary  px-0 pt-3">
                <div className="bg-white  pb-3  ">
                   <div className="row ms-5 pt-3">
                       <div className="col-3">
                           <h6 className="fw-bold">Project Name
                               <br/><p class="fw-lighter">{projectName}</p>
                           </h6>
                       </div>
                       <div className="col-1 pe-1">
                        <h6 className="fw-bold">Start Date <br/><p className="fw-lighter">{startDate}</p></h6>
                    </div>
                    <div className="col-1 pe-1">
                        <h6 className="fw-bold">End Date <br/> <p className="fw-lighter">{startDate1}</p></h6>
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


               <div className='row'>
                    <div className='col-3'>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        { APIData.length>0?
                (APIData.map((data)=>

                (
                 <tr>

                <td></td>
                <td></td>
                <td className='mb-5  pt-3 '>
                  <div className='m-1'>
                <div className="dropdown   m-0 border border-secondary position-relative" data-bs-toggle="dropdown" >
                                <BsThreeDotsVertical size={20} className=" ms-3" /><span className='ms-3'>{data.taskName} <br/> <div className='mx-0 pe-2'>{data.start}     <FaArrowsAltH/> {data.start1} <div className='ms-3'>{data.taskowner}</div></div></span></div>
                                <div className="dropdown-menu bg-secondary lh-1 input-sm p-auto text-centre ms-5">
                                    <NavLink to='/ChartEdit' className="text-white text-decoration-none ms-4"  onClick={() => setData(data)}>Edit</NavLink><hr/>
                                    <a href="" class="text-white text-decoration-none ms-4" onClick={()=>{handleShow(data.id)}}>Delete</a>
                              </div>   
                              </div>
                </td>
                <td>
                   <div className='d-grid' >
                     <input type="button" className="rounded-pill text-white border-0 statusBar" value={data.status}/>
                     </div>
                 </td>
                 <td><RiDeleteBin5Line className="edit m-1" onClick={()=>{handleShow(data.id)}} size={25} color="gray"/></td>
                       </tr>
                )
                )):(<tr>
                   <td className='text-warning text-center fw-bold'>No Records found</td> <td></td> <td></td><td></td><td></td>
                  <td></td>  
                </tr>)
} 
                          

                        </tbody>
                    </div>
                    <div className='col-9'>
                    <Table borderless className='table'>
    <thead>
      <tr className='bgtable'>
        
        <th >Jan22</th>
        <th >Feb22</th>
        <th>Mar22</th>
        <th>Apr22</th>
        <th>May22</th>
        <th>Jun22</th>
        <th>Jul22</th>
        <th>Aug22</th>
        <th>Sep22</th>
        <th>Oct22</th>
        <th>Nov22</th>
        <th>Dec22</th>
      </tr>
    </thead>
    <tbody>
    { APIData.length>0?
                (APIData.map((data)=>

                (
      <tr className='bgtable'>
        <td > <input type="button" className="rounded-pill  border-0 statusBar " value={data.priority}/></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
       )
       )):(<tr>
          <td className='text-warning text-center fw-bold'>No Records found</td> <td></td> <td></td><td></td><td></td>
         <td></td>  
       </tr>)
} 
      </tbody>
      </Table>
                    </div>
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
                       
                       {/*--------------------------------------------------*/}
                       {/* <div className="gantt">
		<div className="gantt__row gantt__row--months">
			<div className="gantt__row-first"></div>
			<span>Jan</span><span>Feb</span><span>Mar</span>
			<span>Apr</span><span>May</span><span>Jun</span>
			<span>Jul</span><span>Aug</span><span>Sep</span>
			<span>Oct</span><span>Nov</span><span>Dec</span>
		</div>
		<div className="gantt__row gantt__row--lines" data-month="5">
			<span></span><span></span><span></span>
			<span></span><span></span><span></span>
			<span></span><span class="marker"></span><span></span>
			<span></span><span></span><span></span>
		</div>
		<div className="gantt__row">
			<div className="gantt__row-first">
				Barnard Posselt
			</div>
			<ul className="gantt__row-bars">
				<li style="grid-column: 4/11; background-color: #2ecaac;">Even longer project</li>
			</ul>
		</div>
		<div className="gantt__row gantt__row--empty">
			<div className="gantt__row-first">
				Ryley Huggons
			</div>
			<ul className="gantt__row-bars"></ul>
		</div>
		<div className="gantt__row">
			<div className="gantt__row-first">
				Lanie Erwin
			</div>
			<ul className="gantt__row-bars">
				<li style="grid-column: 2/5; background-color: #2ecaac;">Start Februar 🙌</li>
				<li style="grid-column: 1/6; background-color: #ff6252;" class="stripes"></li>
				<li style="grid-column: 7/11; background-color: #54c6f9;">Same line</li>
			</ul>
		</div>
		<div className="gantt__row gantt__row--empty">
			<div className="gantt__row-first">
				Krishnah Pauleit
			</div>
			<ul className="gantt__row-bars"></ul>
		</div>
		<div className="gantt__row gantt__row--empty">
			<div className="gantt__row-first">
				Hobard Lampitt
			</div>
			<ul className="gantt__row-bars"></ul>
		</div>
		<div className="gantt__row">
			<div className="gantt__row-first">
				Virgilio Jeanes
			</div>
			<ul className="gantt__row-bars">
				<li style="grid-column: 2/5; background-color: #2ecaac;"></li>
			</ul>
		</div>
		<div className="gantt__row">
			<div className="gantt__row-first">
				Ky Verick
			</div>
			<ul className="gantt__row-bars">
				<li style="grid-column: 3/8; background-color: #54c6f9;">Long project</li>
			</ul>
		</div>

		<div className="gantt__row">
			<div className="gantt__row-first">
				Ketti Waterworth
			</div>
			<ul className="gantt__row-bars">
				<li style="grid-column: 4/9; background-color: #ff6252;" className="stripes">A title</li>
			</ul>
		</div>
	</div> */}
            </div>
            </div>
        </div>
   </div> 

   </>
  )
}

export default Chart
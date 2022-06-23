import React from 'react'
import {OverlayTrigger,Tooltip,Modal,Button} from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import {AiOutlineBarChart} from 'react-icons/ai';
import {MdEdit} from 'react-icons/md';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {BsSearch} from 'react-icons/bs';
import {AiOutlinePlus} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import {useHistory} from 'react-router';
import {BiTask} from 'react-icons/bi';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
const Home = () => {

  const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [deleteId,setDeleteId]=useState("");
    const handleShow = (info) =>  {
      setShow(true);
      setDeleteId(info);
    }
//-----------------------getdata----------
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
  axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/project`)
  .then((response) => {
      setAPIData(response.data);
      console.log(response.data)
  })
}, [])


const setData = (data) => {
  console.log('set data',data)
  let { id,projectName, startDate, startDate1,projectManager,status  } = data;
  localStorage.setItem('ProjectID', id);
  // alert(id)
  localStorage.setItem('ID', id);
  localStorage.setItem('ProjectName',  projectName,);
  localStorage.setItem('StartDate',startDate );
  localStorage.setItem('StartDate1',startDate1);
  localStorage.setItem('ProjectManager',projectManager );
  localStorage.setItem('Status',status );
}

const getData = () => {
  axios.get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/project`)
      .then((getData) => {
           setAPIData(getData.data);
       })
}
const onDelete = (id) => {
axios.delete(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/project/${id}`)
.then(() => {
getData();
})
}
//-----------------search--------------
const searchItems = (searchValue) => {
  setSearchInput(searchValue)
  if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
  }
  else{
      setFilteredResults(APIData)
  }
}

//-------------------Sort--------------------------
const sortOptions=["projectName","startDate", "startDate1","status"];
 const [sortValue,setSortValue]=useState(" ")
//  const [value,setValue]=useState(" ")
const handleSort=async(e)=>{
  let value=e.target.value;
  setSortValue(value);
  return await axios
  .get(`https://62a6b5f7bedc4ca6d7b888ad.mockapi.io/project?sortBy=${value}&order=asc`)
  .then((response) => {
      setAPIData(response.data);
     
      console.log(response.data)
    })
    .catch((err)=>console.log(err));
  
 };console.log('APIData')
 //-------------
//  const [order,setOrder]=useState("ASC")
//  const sorting=(col)=>{
//   if(order === "Asc"){
//     const sorted = [...APIData].sort((a,b)=>
//     a[col].toLowerCase()>b[col].toLowerCase() ? 1 : -1
//     );
//     setAPIData(sorted);
//     setOrder("Dsc");
//   }
//   if(order === "Dsc"){
//     const sorted = [...APIData].sort((a,b)=>
//     a[col].toLowerCase()<b[col].toLowerCase() ? 1 : -1
//     );
//     setAPIData(sorted);
//     setOrder("Asc");
//  }
// }
//--------pagination--

//---------------------------------------------
const [currentPage, setcurrentPage] = useState(1);
const [itemsPerPage, setitemsPerPage] = useState(5);
const pages = [];
for (let i = 1; i <= Math.ceil(APIData.length / itemsPerPage); i++) {
  pages.push(i);
}
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = APIData.slice(indexOfFirstItem,indexOfLastItem);

const handleClick = (event) => {
  setcurrentPage(Number(event.target.id));
};

 const renderPageNumbers = pages.map((number) => { 
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage == number ? "active" : null}
      >
        {number}
      </li>
    );
  
});

const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }
  return (
    <>
    <div className='text'>
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
          <div className="p-2 lh-1 bg-danger text-white">HOME</div>
          <div className="p-2 lh-1 ">ADD PRODUCT</div>
          <div className="p-2 lh-1">LOGOUT</div>
        </div>
   
    <div className="bg-secondary  p-2 mt-2">
     <div className="bg-white m-2 pb-4 ">
         <div className="pt-4 ps-5 pe-4 row">
             <div className="col">
               <h5 className="text-lighter ">Projects</h5>
             </div>
             <div className="col ">
               <div className="d-flex justify-content-end">
              <form className="col-4 position-relative">
              <input className="form-control me-2 ps-5" type="search " placeholder="Search Project" onChange={(e) => searchItems(e.target.value)}/>
              <BsSearch className=" position-absolute top-50 start-0 translate-middle-y ps-3 pt-0  text-secondary " size={35}></BsSearch>
            </form>
             <NavLink to="/AddProjects">
                <button className="btn  bg-danger ms-3 me-3 text-white rounded-0" type="text"><AiOutlinePlus className=" me-1 "/>PROJECT</button>
                </NavLink>
            </div>
             </div>
        </div>
        <div className="ps-5 pe-5 row pb-5">
      <table className="table table-striped mt-3 mb-4 pb-5">
            <thead >
              <tr className="TableRow pt-2">
                <th scope="col" >PROJECT NAME</th>
                <th scope="col">START DATE</th>
                <th scope="col">END DATE</th>
                <th scope="col">PROJECT MANAGER</th>
                <th scope="col" class="ps-5">Status</th>
                <th></th>
               
              </tr>
            </thead>
            <tbody>
            {searchInput.length > 1 ? (
                    filteredResults.map((data,) => {
                        return (
                          <tr>

                          <td>{data.projectName}</td>
                          <td>{data.startDate}</td>
                          <td>{data.startDate1}</td>
                          <td>{data.projectManager}</td>
                          <td>
                   <div className='d-grid' >
                     <input type="button" className="rounded-pill text-white border-0  statusBar" value={data.status}/>
                     </div>
                 </td>
                         
                 <td className='text-end' >
                
                 <OverlayTrigger className="edit " overlay={<Tooltip id="tooltip-disabled">Chart</Tooltip>}>
                     <NavLink to="/Chart" className="Editbtn">
                       <AiOutlineBarChart   size={30}   color="gray"  onClick={() => setData(data)}/> </NavLink>
                      </OverlayTrigger>
                      <OverlayTrigger className="edit text-decoration-none" overlay={<Tooltip id="tooltip-disabled">Add Task</Tooltip>}>
                     <NavLink to={`/AddPage/${data.Pid}`} className="Editbtn">
                       <BiTask  size={30} className="me-2"  color="gray"  onClick={() => setData(data)}/> </NavLink>
                      </OverlayTrigger>    
                    <OverlayTrigger className="edit text-decoration-none" overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                     <NavLink to="/AddProjectPage" className="Editbtn">
                       <MdEdit  size={30}   color="gray"  onClick={() => setData(data)}/> </NavLink>
                      </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                      <a style={{cursor:"pointer"}}><RiDeleteBin5Line className="edit m-1" onClick={()=>{handleShow(data.id)}} size={30} color="gray"/></a>
                     </OverlayTrigger>
                    </td>
                          </tr>
                        )
                    })
                ):
                  
                currentItems.length>0?
                (currentItems
                  .map((data,i)=>
             
                (
                 <tr>

                 <td>{data.projectName}</td>
                 <td>{data.startDate}</td>
                 <td>{data.startDate1}</td>
                 <td>{data.projectManager}</td>
                 <td>
                   <div className='d-grid' >
                     <input type="button" className="rounded-pill text-white border-0 statusBar" value={data.status}/>
                     </div>
                 </td>
               
                 <td className='text-end' >
                  

                
                 {/* <OverlayTrigger className="edit" key={data.id} overlay={<Tooltip id="tooltip-disabled">Chart</Tooltip>}>
                     <NavLink to={`/ProjectManagement/${data.id}`} className="Editbtn">
                       <AiOutlineBarChart className="me-2"   size={30}   color="gray"  onClick={() => setData(data)}/> </NavLink>
                      </OverlayTrigger>
                      */}
 
                 <OverlayTrigger className="edit" overlay={<Tooltip id="tooltip-disabled">Chart</Tooltip>}>
                     <NavLink to="/ProjectManagement"  className="Editbtn">
                       <AiOutlineBarChart className="me-2"   size={30}   color="gray"  onClick={() => setData(data)}/> </NavLink>
                      </OverlayTrigger>
                     
                      <OverlayTrigger className="edit text-decoration-none" overlay={<Tooltip id="tooltip-disabled">Add Task</Tooltip>}>
                     <NavLink to="/AddPage"  className="Editbtn">
                       <BiTask  size={30} className="me-2"  color="gray"  onClick={() => setData(data)}/> </NavLink>
                      </OverlayTrigger>    

                    <OverlayTrigger className="edit text-decoration-none" overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                     <NavLink to="/AddProjectPage" className="Editbtn">
                       <MdEdit  size={30}  className="me-2"  color="gray"  onClick={() => setData(data)}/> </NavLink>
                      </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                      <a style={{cursor:"pointer"}}><RiDeleteBin5Line className="edit me-2" onClick={()=>{handleShow(data.id)}} size={30} color="gray"/></a>
                     </OverlayTrigger>
                     
                    </td>
                  
                       </tr>
                )
                )):(<tr>
                   <td className='text-warning text-center fw-bold'>No Records found</td> <td></td> <td></td><td></td><td></td>
                  <td></td>  
                </tr>)
}




             {/* <tr>
                 <td>Project 1 Lexinberg</td>
                <td>01-22-2022</td>
                <td>11-22-2022</td>
                <td>Jone Cooper</td>
                <td ><button className="btn bg-warning rounded-pill " id="bg-active">Active</button></td>
                <td><AiOutlineBarChart className=" text-secondary" size={30}></AiOutlineBarChart></td>
                <td><MdEdit className="text-secondary" size={30}></MdEdit></td>
                <td><RiDeleteBin5Line className="text-secondary" size={30}></RiDeleteBin5Line></td>
              </tr>
              <tr>
                <td>Project 2  Washington DC</td>
                <td>02-02-2022</td>
                <td>10-10-2022</td>
                <td>Wade Warren</td>
                <td ><button className="btn bg-warning rounded-pill" id="bg-active">Active</button></td>
                <td><AiOutlineBarChart className=" text-secondary" size={30}></AiOutlineBarChart></td>
                <td><MdEdit className="text-secondary" size={30}></MdEdit></td>
                <td><RiDeleteBin5Line className="text-secondary" size={30}></RiDeleteBin5Line></td>
              </tr>
              <tr>
                <td>Project 4 Boston</td>
                <td>01-10-2022</td>
                <td>05-10-2022</td>
                <td>Guy Havikns</td>
                <td ><button className="btn delayed rounded-pill ps-5 pe-4 " id="delayed">Delayed</button></td>
                <td><AiOutlineBarChart className=" text-secondary" size={30}></AiOutlineBarChart></td>
                <td><MdEdit className="text-secondary" size={30}></MdEdit></td>
                <td><RiDeleteBin5Line className="text-secondary" size={30}></RiDeleteBin5Line></td>
              </tr>
              <tr>
                <td>Project 3 Las Vegas</td>
                <td>06-15-2022</td>
                <td>12-10-2022</td>
                <td>Ethen Hawk</td>
                <td ><button className="btn bg-secondary rounded-pill ps-4 pe-4">Not Started</button></td>
                <td><AiOutlineBarChart className=" text-secondary" size={30}></AiOutlineBarChart></td>
                <td><MdEdit className="text-secondary" size={30}></MdEdit></td>
                <td><RiDeleteBin5Line className="text-secondary" size={30}></RiDeleteBin5Line></td>
              </tr>
              <tr>
                <td>Project 4 Boston</td>
                <td>01-15-2022</td>
                <td>04-10-2022</td>
                <td>Robert</td>
                <td ><button className="btn bg-success rounded-pill ps-4 pe-4">Completed</button></td>
                <td><AiOutlineBarChart className=" text-secondary" size={30}></AiOutlineBarChart></td>
                <td><MdEdit className="text-secondary" size={30}></MdEdit></td>
                <td><RiDeleteBin5Line className="text-secondary" size={30}></RiDeleteBin5Line></td>
              </tr> */}
            </tbody>
          </table>
          <div>
    <h5>Sort By:</h5>
    <select onChange={handleSort} value={sortValue} >
       {sortOptions.map((data,index)=>(
        <option value={data} key={index}>{data}</option>
       ))}
      </select>
    
  </div>
   {/* <div style={{margin:"auto",padding:"15px",maxWidth:"200px",alignContent:"center",}}>
    {renderPagination}
  </div> 
  <nav aria-label="Page navigation example">
  <ul class="pagination">
  
    <li class="page-item" onClick={()=>loadUserData(4,8,1)}><a class="page-link" href="#">1</a></li>
    
    <li class="page-item" ><a class="page-link" href="#">Next</a></li>
  </ul>
</nav> */}
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
        </div>

     
        </div>
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

                    
    </>
  )
}

export default Home


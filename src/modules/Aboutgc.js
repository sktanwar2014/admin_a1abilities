import React, { useEffect, useState } from 'react';
import Header from './Components/Header.js';
import Sidebar from './Components/Sidebar.js';


import { Link } from 'react-router-dom';


// import api
import FetchAPI from '../api/APIs.js';

export default function AboutGC(props){
  const [AboutGCList, setAboutGCList] = useState([]);
  
  const fetchAboutGC = async () => {
    try{    
      const result = await FetchAPI.getTabRelatedList({type: 'AboutGC'});      
      setAboutGCList(result.resultList);
      // console.log('result',result)
    }catch(e){
      console.log('Error...',e);
    }
  }

  useEffect(() => {
   fetchAboutGC();
  },[]);

  const handleUpdate = async (data) => {
    console.log('handleUpdate',data)
  }

  const handleActiveDeactive = async (data) => {
    console.log('handleActiveDeactive',data)
    try{    
      const result = await FetchAPI.changeState({type: 'AboutGC', id: data.id, is_active: data.is_active});
      setAboutGCList(result.resultList);
      // console.log('result',result)
    }catch(e){
      console.log('Error...',e);
    }
  }

        return (
          <div>
                 <Header {...props}/>
                 <Sidebar />
                  <div className="sidebar-overlay" id="sidebar-overlay" />
                  <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
                  <div className="mobile-menu-handle" />
                  <article className="content responsive-tables-page">
                    <div className="title-block">
                      <h1 className="title">About GC
          <Link to= {{pathname:"/editor", state : {type:'AboutGC', operation: 'add'}}}><button type="button" style={{float: 'right' }}className="btn btn-success-outline">Add</button></Link>
                      </h1>
                      <p className="title-description"></p>
                    </div>
                    <section className="section">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card">
                            <div className="card-block">
                              <div className="card-title-block">
                                <h3 className="title"></h3>
                              </div>
                              <section className="example">
                                <div className="table-responsive">
                                  <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                      <tr>
                                        <th>S No.</th>
                                        <th> About GC </th>
                                        <th> Update</th>
                                        <th> Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {AboutGCList.map((data, index) => {
                                          return(
                                            <tr>
                                              <td>{index+1}</td>
                                              <td>{data.title}</td>
                                              <td><Link to= {{pathname:"/editor", state : {type:'AboutGC', operation: 'update', data: data}}}><button type="button" className="btn btn-success-outline">Update</button></Link></td>
                                              <td><button type="button" className="btn btn-danger-outline"  onClick={()=>{handleActiveDeactive(data)}}>{data.is_active === 1 ? 'Deactive': 'Active'}</button></td> 
                                            </tr>    
                                          )                               
                                        })                                        
                                        }
                                    </tbody>
                                  </table>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <div className="ref" id="ref">
                      <div className="color-primary" />
                      <div className="chart">
                        <div className="color-primary" />
                        <div className="color-secondary" />
                      </div>
                    </div>
                  </article>
                </div>
          )
    }
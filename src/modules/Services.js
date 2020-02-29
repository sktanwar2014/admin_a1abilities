import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import Header from './Components/Header.js';
import Sidebar from './Components/Sidebar.js';
import { Link } from 'react-router-dom';


// import api
import FetchAPI from '../api/APIs.js';

export default function Services(){
  const [serviceList, setServiceList] = useState([]);
  
  const fetchServices = async () => {
    try{    
      const result = await FetchAPI.getServicesList({}); 
      setServiceList(result.serviceList);
      console.log('result',result)
    }catch(e){
      console.log('Error...',e);
    }
  }

  useEffect(() => {
   fetchServices();
  },[]);

  const handleUpdate = async (data) => {
    console.log('handleUpdate',data)
  }

  const handleActiveDeactive = async (data) => {
    console.log('handleActiveDeactive',data)
  }
        return (
          <div>
                 <Header />
                 <Sidebar />
                  <div className="sidebar-overlay" id="sidebar-overlay" />
                  <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
                  <div className="mobile-menu-handle" />
                  <article className="content responsive-tables-page">
                    <div className="title-block">
                      <h1 className="title"> Our Services 
                     

                      <Link to= {{pathname:"/editor", state : {type:'services', operation: 'add'}}}><button type="button" className="btn btn-success-outline">Add</button></Link>
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
                                        <th>Our Technology Name </th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody>                                        
                                        {serviceList.map((data, index) => {
                                          return(
                                            <tr>
                                              <td>{index+1}</td>
                                              <td>{data.title}</td>
                                              <td><button type="button" className="btn btn-success-outline" onClick={()=>{handleUpdate(data)}}>Update</button></td>
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
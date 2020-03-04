import React, {useState, useEffect } from 'react';
import Header from './Components/Header.js';
import Sidebar from './Components/Sidebar.js';
import {Redirect} from 'react-router-dom';


// import api
import FetchAPI from '../api/APIs.js';

export default function Editor(mainProps) {
  const props = mainProps.location.state;
  const type = props.type;
  const operation = props.operation;

 

  let pathLink = '';
  let titleText = '';
  switch(type){

    case 'services'   : titleText = 'Our Services'  ; pathLink = '/Services';  break;
    case 'technology' : titleText = 'Our Technology'; pathLink = '/OurTechnology'; break;
    case 'whyus'      : titleText = 'Why Us'        ; pathLink = '/WhyUs'; break;
    case 'contact'    : titleText = 'Contact'       ; pathLink = '/Contact'; break;
    case 'partners'   : titleText = 'Our Partners'  ; pathLink = '/OurPartners'; break;
    case 'about'      : titleText = 'About us'      ; pathLink = '/About'; break;
    case 'goals'      : titleText = 'Our Goals'     ; pathLink = '/OurGoals'; break;
    case 'portfolio'  : titleText = 'Portfolio'     ; pathLink = '/Portfolio'; break;

 }
  


  const [inputs, setInputs] = useState({name:'', content: ''});
  //const [image, setImage] = useState({});

  const handleChange  = (props) => {
    setInputs({...inputs, [props.target.name]: props.target.value});
  }

  useEffect(() => {
    if(Object.keys(props)[2] === 'data'){
      setInputs({name: props.data.title, content: props.data.content })
    }
  },[])

  const selectImage = () => {
    if(document.getElementById('upload_image').files && document.getElementById('upload_image').files[0]){
      let reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('imagePreview').style.backgroundImage = 'url(' + e.target.result + ')';
      };
      reader.readAsDataURL(document.getElementById('upload_image').files[0]);
      document.getElementById('closeFrame').click();
    }
  }

  const handleSubmit = async (e) => {
    if(inputs.name !=='' && inputs.content !== ''){
      try{
        if(operation==='add'){
          const result = await FetchAPI.addFormContent({
            type: type,
            title: inputs.name,
            content: inputs.content,
                   

          });
        } else if(operation==='update'){
          const result = await FetchAPI.updateFormContent({
            type: type,
            title: inputs.name,
            content: inputs.content,
            id: props.data.id,
            image_id: props.data.image_id,
            link_id: props.data.link_id,   
            
            
          });
        }
        
      }catch(e){
        console.log('Error...',e);
      }
    }else{
      alert('Need all fields')
    }
  }

  

        return (
         <div>

               <Header {...mainProps}/>
                <Sidebar/>  
            
                <div>
                <div className="sidebar-overlay" id="sidebar-overlay" />
                <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
                <div className="mobile-menu-handle" />
                <article className="content item-editor-page">
                  <div className="title-block">
                    
                    <h3 className="title"> 
                    {titleText}


                    <a href= {pathLink} >
                    <button type="button" id="closeFrame" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                          <span className="sr-only">Close</span>
                        
                        </button>
                    </a>
                    
                                        
                    <span className="sparkline bar" data-type="bar" />
                    </h3>
                  </div>
                  <form name="item">
                    <div className="card card-block">
                      <div className="form-group row">
                        <label className="col-sm-2 form-control-label text-xs-right" > Name: </label>
                        <div className="col-sm-10">

                          <input className="form-control boxed" placeholder type="text" value = {inputs.name} name="name" onChange={handleChange } />
                          
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 form-control-label text-xs-right"> Content: </label>
                        <div className="col-sm-10">
                          <textarea className="form-control boxed " rows="8" type="text" value = {inputs.content} name="content" onChange={handleChange } />
                        </div>
                      </div>                     
                      <div className="form-group row">
                        <label className="col-sm-2 form-control-label text-xs-right"> Images: </label>
                        <div className="col-sm-10">
                          <div className="images-container">
                            <div className="image-container">
                              <div className="controls">
                                <a href="#" className="control-btn remove" data-toggle="modal" data-target="#confirm-modal">
                                  <i className="fa fa-trash-o" />
                                </a>
                              </div>
                              <div id = "imagePreview" className="image" style={{backgroundImage: ''}} />  
                              <img src=''/>                                    
                            </div>
                           
                            <a href="#" className="add-image" data-toggle="modal" data-target="#modal-media">
                              <div className="image-container new">
                                <div className="image">
                                  <i className="fa fa-plus" />
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-10 col-sm-offset-2">
                       
                                       {/* helloThere() 
                                          {
                                            handleSubmit
                                          }

                                          messageInConsole() 
                                          {
                                            return <Redirect to='/'/>
                                          } */}

                        
                          <button type="button"  className="btn btn-primary" onClick={() => {
                                                            this.helloThere();
                                                            this.messageInConsole();
                                                          }}>   Submit </button>
                                                                            
                        
                        </div>
                      </div>
                    </div>
                  </form>
                </article>
                <div className="modal fade" id="modal-media">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Media Library</h4>
                        <button type="button" id="closeFrame" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                          <span className="sr-only">Close</span>
                        </button>
                      </div>
                      <div className="modal-body modal-tab-container">
                        <ul className="nav nav-tabs modal-tabs" role="tablist">
                          <li className="nav-item">
                            <a className="nav-link" href="#gallery" data-toggle="tab" role="tab">Gallery</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link active" href="#upload" data-toggle="tab" role="tab">Upload</a>
                          </li>
                        </ul>
                        <div className="tab-content modal-tab-content">
                          <div className="tab-pane fade" id="gallery" role="tabpanel">
                            <div className="images-container">
                              <div className="row">
                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                  <div className="image-container">
                                    <div className="image" style={{backgroundImage: 'url("https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg")'}} />
                                  </div>
                                </div>                              
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" className="btn btn-primary">Insert Selected</button>
                            </div>
                          </div>
                          <div className="tab-pane fade active in" id="upload" role="tabpanel">
                            <div className="upload-container">
                              <div id="dropzone">
                                <form action="/" method="POST" encType="multipart/form-data" className="dropzone needsclick dz-clickable" id="demo-upload">
                                  <div className="dz-message-block">
                                    <div className="dz-message needsclick">
                                      <input accept="image/gif, image/jpeg, image/png, image/jpg"  style ={{display: 'none'}} id="upload_image" type="file" onChange ={selectImage} />
                                        <label htmlFor="upload_image">
                                          Click to upload.
                                        </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="modal fade" id="confirm-modal">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title"><i className="fa fa-warning" /> Alert</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure want to do this?</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Yes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div className="ref" id="ref">
                  <div className="color-primary" />
                  <div className="chart">
                    <div className="color-primary" />
                    <div className="color-secondary" />
                  </div>
                </div>
              </div>

              </div>
            );      
        };
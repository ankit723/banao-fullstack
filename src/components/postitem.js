import React from "react";
import views from "./icons/views.png";
import share from "./icons/share.png";




const Post2=(props)=>{
    return (
        <div className="post container my-4">
            <div class="card" style={{maxWidth:"65%", overflow:"hidden"}}>
                <div class="card-body">
                    <div className="d-flex justify-content-between">
                        <p className="card-text"style={{fontWeight:"bold", fontSize:"1.3rem", paddingBottom:"8rem"}}>{props.title}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <a href="#" class="d-flex align-items-center nav-link"><h5 className="profile-name mx-3">{props.profile_name}</h5></a>
                        
                        <a href="#" class="d-flex align-items-center nav-link"><img src={views} alt="" style={{width:"2rem"}}/> <h5 className="views my-2">{"1.4k views"}</h5></a>
                    </div>

                </div>
            </div>
        </div>
            
    );  
}
export default Post2;
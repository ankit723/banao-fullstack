import React from "react";
import head_title from "./icons/nav-title.png";
import hero_img from "./icons/hero-image.png";
import hero_img2 from "./icons/hero-image2.png";
import PostApp from "./posts"
import { redirect } from 'react-router';



export function Auth_done(props) {
    
    const logout=()=>{
        localStorage.removeItem('user');
        window.location.reload();
        return redirect("/")
    }

    return (
        <>
        <header class="flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom header" style={{display:"flex"}}>
            <div class="col-md-3 mb-2 mb-md-0">
                <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
                <img src={head_title} alt="" style={{width:"10rem"}}/>
                </a>
            </div>

            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search your favorite groups in ATG" aria-label="Search" style={{width:"25rem", borderRadius:"2rem"}}/>
            </form>

            <div class="col-md-3 text-center">
                <a href="#" type="button" className="nav-link text-black fw-bold">Welcome! <span className="text-primary">{props.name}</span></a>
                <button type="button" class="btn btn-primary" onClick={logout}>Log Out</button>
            </div>
        </header>
        <img src={hero_img} alt="" className="head-img" style={{width:"100vw", maxWidth:"100%", marginBottom:"2rem", overflowX:"hidden"}}/>
        
        <img src={hero_img2} alt="" className="head-img2" style={{display:"none", width:"100vw", maxWidth:"100%", marginBottom:"2rem", overflowX:"hidden"}}/>
        
        <PostApp setLoginUser={props.setLoginUser._id} username={props.setLoginUser.username}/>
        </>
    );
}

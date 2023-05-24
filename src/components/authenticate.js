import React, {useState} from "react";
import axios from "axios"
import head_title from "./icons/nav-title.png";
import hero_img from "./icons/hero-image.png";
import hero_img2 from "./icons/hero-image2.png";
import signup from "./icons/signup.png";
import facebook from "./icons/facebook.png";
import google from "./icons/google.png";
import { redirect } from 'react-router';



export function Auth({setLoginUser}) {

    const [forgetpass, setForgetPass] = useState('');

    const [user, setUser] = useState({
        username:"",
        email:"",
        password:"",
        reEnterPassword:"",
    })

    const handleChange=(event)=>{
        const{name, value}=event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register=()=>{
        const {username, email, password, reEnterPassword}= user
        if (username && email && password && (password===reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then( res => alert(res.data.message))
        } else{
            alert('invalid input')
        }
    }
    
    const login=()=>{
        axios.post("https://atg-backend-q7x9.onrender.com/login", user)
        .then(res=>{
            alert(res.data.message)
            if(res.data.message==="User Logged In"){
                setLoginUser(res.data.user)
                localStorage.setItem('user', 'true')
                localStorage.setItem('userdb', JSON.stringify(res.data.user))
                const modalBackdrop = document.querySelector('.modal-backdrop.fade.show');
                if (modalBackdrop) {
                    modalBackdrop.remove();
                }
                return redirect("/")
            }
            
        })
    }
    
    const forgot=()=>{
        axios.post("http://localhost:9002/forgot", {username:user.username, email:user.email})
        .then(res=>{
            const password=res.data.pass;
            setForgetPass(password)
        })
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
                <a href="#" type="button" className="nav-link text-black fw-bold" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create account. <span className="text-primary">It's free!</span></a>
            </div>
        </header>
        <img src={hero_img} alt="" className="head-img" style={{width:"100vw", maxWidth:"100%", marginBottom:"2rem", overflowX:"hidden"}}/>
        
        <img src={hero_img2} alt="" className="head-img2" style={{display:"none", width:"100vw", maxWidth:"100%", marginBottom:"2rem", overflowX:"hidden"}}/>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                <div class="modal-header"style={{backgroundColor:"#EFFFF4"}}>
                    <h1 class="modal-title fs-6" id="staticBackdropLabel" >Let's learn, share & inspire each other with our passion for computer engineering. Sign up now 🤘🏼</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="container d-flex" style={{justifyContent:"flex-end", marginTop:"2rem"}}>
                <p>Already have an account? <span className="" style={{color:"blue"}}><a href="#" type="button" data-bs-target="#staticBackdrop2" data-bs-toggle="modal"> Sign In</a></span></p>
                </div>
                <div class="modal-body">
                    <div class=" px-4">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div class="col-10 col-sm-8 col-lg-6">
                            <img src={signup} class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                        </div>
                        <div class="normal-sign-up col-lg-6">
                            <h1 class="display-5 fw-bold fs-1 text-body-emphasis lh-1 mb-3">Create Account</h1>
                            
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="First Name" aria-label="Username" style={{borderRadius:"0", backgroundColor:"whitesmoke", padding:"1.3rem"}}/>
                                <input type="text" class="form-control" placeholder="Last Name" aria-label="Server" style={{borderRadius:"0", backgroundColor:"whitesmoke", padding:"1.3rem"}}/>
                            </div>
                            <input type="text" class="form-control" name="email" value={user.email} placeholder="Email" aria-label="Server" style={{borderRadius:"0", backgroundColor:"whitesmoke", padding:"1.3rem"}} onChange={handleChange}/>
                            <input type="text" class="form-control" name="username" value={user.username} placeholder="Username" aria-label="Server" style={{borderRadius:"0", backgroundColor:"whitesmoke", padding:"1.3rem"}} onChange={handleChange}/>
                            <input type="password" class="form-control" name="password" value={user.password} placeholder="Password" aria-label="Server" style={{borderRadius:"0", backgroundColor:"whitesmoke", padding:"1.3rem"}} onChange={handleChange}/>
                            <input type="password" class="form-control" name="reEnterPassword" value={user.reEnterPassword} placeholder="Confirm Password" aria-label="Server" style={{borderRadius:"0", backgroundColor:"whitesmoke", padding:"1.3rem"}} onChange={handleChange}/>

                            <div class="d-grid gap-2 mt-4 alt-sign-up-buttons">
                                <button class="btn btn-primary" type="button" style={{borderRadius:"5rem"}} onClick={register}data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Create Account</button>
                                <button class="btn btn-outline-secondary" type="button" style={{marginTop:"2rem", borderRadius:"0", color:"black"}}> <img src={facebook} alt="" style={{width:"1.5rem", marginRight:"0.5rem"}}/> Sign Up With Facebook</button>
                                <button class="btn btn-outline-secondary" type="button" style={{borderRadius:"0", color:"black"}}> <img src={google} alt="" style={{width:"1.5rem", marginRight:"0.5rem"}}/> Sign up with Google</button>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
        </div>

        <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                <div class="modal-header"style={{backgroundColor:"#EFFFF4"}}>
                    <h1 class="modal-title fs-6" id="staticBackdropLabel" >Let's learn, share & inspire each other with our passion for computer engineering. Sign in now 🤘🏼</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="container d-flex" style={{justifyContent:"flex-end", marginTop:"2rem"}}>
                <p>Don't have an account yet? <span className="" style={{color:"blue"}}><a href="#0" type="button" data-bs-target="#staticBackdrop" data-bs-toggle="modal"> Create new for free!</a></span></p>
                </div>
                <div class="modal-body">
                    <div class=" px-4">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div class="col-10 col-sm-8 col-lg-6">
                            <img src={signup} class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                        </div>
                        <div class="col-lg-6">
                            <h1 class="display-5 fw-bold fs-1 text-body-emphasis lh-1 mb-3">Sign In</h1>
                            
                            <input type="text" class="form-control" name="username" value={user.username} placeholder="Username" aria-label="Server" style={{borderRadius:"0", backgroundColor:"whitesmoke", padding:"1.3rem"}} onChange={handleChange}/>
                            <input type="password" class="form-control" name="password" value={user.password} placeholder="Password" aria-label="Server" style={{borderRadius:"0", backgroundColor:"whitesmoke", padding:"1.3rem"}} onChange={handleChange}/>

                            <div class="d-grid gap-2 mt-4 ">
                                <button class="btn" type="button" style={{borderRadius:"5rem"}} onClick={forgot} data-bs-toggle="modal" data-bs-target="#staticBackdrop3">Forgot Password</button>
                                <button class="btn btn-primary" type="button" style={{borderRadius:"5rem"}} onClick={login}>Sign In</button>
                                <button class="btn btn-outline-secondary" type="button" style={{marginTop:"2rem", borderRadius:"0", color:"black"}}> <img src={facebook} alt="" style={{width:"1.5rem", marginRight:"0.5rem"}}/> Sign In With Facebook</button>
                                <button class="btn btn-outline-secondary" type="button" style={{borderRadius:"0", color:"black"}}> <img src={google} alt="" style={{width:"1.5rem", marginRight:"0.5rem"}}/> Sign In with Google</button>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                <div class="modal-header"style={{backgroundColor:"#EFFFF4"}}>
                    <h1 class="modal-title fs-6" id="staticBackdropLabel" >Let's learn, share & inspire each other with our passion for computer engineering. Sign in now 🤘🏼</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="container d-flex" style={{justifyContent:"flex-end", marginTop:"2rem"}}>
                <p>Remember the Password? <span className="" style={{color:"blue"}}><a href="#0" type="button" data-bs-target="#staticBackdrop2" data-bs-toggle="modal"> Click Here to Login!</a></span></p>
                </div>
                <div class="modal-body">
                    <div class=" px-4">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div class="col-10 col-sm-8 col-lg-6">
                            <img src={signup} class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                        </div>
                            <div class="col-lg-6" id="credentials">
                                <h1 class="display-5 fw-bold fs-1 text-body-emphasis lh-1 mb-3">Enter Your credentials</h1>
                                
                                <input type="text" class="form-control" name="username" value={user.username} placeholder="Username" aria-label="Server" style={{borderRadius:"0", backgroundColor:"whitesmoke", padding:"1.3rem"}} onChange={handleChange}/>
                                <input type="text" class="form-control" name="email" value={user.email} placeholder="Email" aria-label="Server" style={{borderRadius:"0", backgroundColor:"whitesmoke", padding:"1.3rem"}} onChange={handleChange}/>

                                <div class="d-grid gap-2 mt-4 ">
                                    <button class="btn" type="button" style={{borderRadius:"5rem"}} onClick={forgot} data-bs-toggle="modal" data-bs-target="#staticBackdrop4">Click To get Your Password</button>
                                </div>
                                
                            </div>        
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                <div class="modal-header"style={{backgroundColor:"#EFFFF4"}}>
                    <h1 class="modal-title fs-6" id="staticBackdropLabel" >Let's learn, share & inspire each other with our passion for computer engineering. Sign in now 🤘🏼</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="container d-flex" style={{justifyContent:"flex-end", marginTop:"2rem"}}>
                <p>Got the Password? <span className="" style={{color:"blue"}}><a href="#0" type="button" data-bs-target="#staticBackdrop2" data-bs-toggle="modal"> Click Here to Login!</a></span></p>
                </div>
                <div class="modal-body">
                    <div class=" px-4">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div class="col-10 col-sm-8 col-lg-6">
                            <img src={signup} class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                        </div>
                        <div class="col-lg-6" id="after_forgot" style={{display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"5rem"}}>
                            <h3 className="text" style={{fontSize:"1.5rem"}}>Your Username is: <span className="text-danger">{user.username}</span></h3>
                            <h3 className="text" style={{fontSize:"1.5rem"}}>Your Password is: <span className="text-danger">{forgetpass}</span></h3>
                        </div>
                        
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
        </div>

        <h2 className="d-flex justify-content-center text-danger">No Post To Show! <a href="#" style={{marginTop:"-0.5rem", color:"#35a31a", fontSize:"2.5rem", textDecoration:"none"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Click Here to Register Now</a></h2>
        </>
    );
}

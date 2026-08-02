import { Component } from "react";
import { Redirect } from "react-router-dom";
import { TbToolsKitchen3 } from "react-icons/tb";
// import Cookies from 'js-cookie';
import './index.css';


class LoginPage extends(Component){
  state = {
    email:'',
    password:'',
    error_msg:'',
    error:false
  }

  onSubmitSuccess = (jwtToken,user) =>{
    const {history} = this.props
    
    localStorage.setItem("party_menu_token",jwtToken);

    localStorage.setItem("party_menu_user",JSON.stringify(user));

    history.replace("/")

  }

  onSubmitFailure = (message) =>{
    this.setState({error_msg:message,error:true})
  }

  onSubmitBtn = async(event) =>{
    event.preventDefault();
    this.setState({isLoading:true})
    // console.log("success")
    const {email,password} = this.state;
    const userDetails = {
      "email" : email,
      "password":password,
    }

    const url = "https://serverless-api-teal.vercel.app/api/auth/signin";
    const options = {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(userDetails)
    }

    const response = await fetch(url,options);
    const data = await response.json()
    this.setState({isLoading:false})
    if(response.ok === true){
      this.onSubmitSuccess(
        data.data.token,
        data.data.user
      )
    }
    else{
      console.log(data.message)
      this.onSubmitFailure(data.message)
    }

  }

  onchangeEmail = (event) =>{
    this.setState({email:event.target.value})
  }
  
  onChangePassword = (event) =>{
    this.setState({password:event.target.value})
  }

  renderEmail = () =>{
    const {email} = this.state
    // console.log(error_msg)
    return(
      <div className="input-container">
        <label htmlFor="email" className="email">Email</label>
        <br/>
        <input
        className="input"
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={this.onchangeEmail}
        />
      </div>
    )
  }

  renderPassword = () =>{
    const {password} = this.state
    return(
      <div className="input-container">
        <label htmlFor="password" className="password">Password</label>
        <br/>
        <input
        className="input"
          type="password"
          id="password"
          value = {password}
          onChange={this.onChangePassword}
          placeholder="Enter your password"
        />
      </div>
    )
  }

  render(){
    const {error,error_msg,isLoading} = this.state
    const token = localStorage.getItem('party_menu_token')
    if(token){
      return <Redirect to="/"/>
    }

    return(
      <div className="login-bg-container">
        <div className="login-menu-bg">
          <img
          src="https://i.postimg.cc/g06s1pfR/Dinner-PNG-File-removebg-preview.png"
          className="icon-image"
          alt='icon-image'
          />
          <h1 className="party-menu">Party Menu</h1>
          <p className="party-para">Sign in to explore our delicious menu</p>
          <form className="form" onSubmit={this.onSubmitBtn}>
            <div className="error-div">
              {
                error?<p className="error-msg">{error_msg}</p>:""
              }
            </div>
            {this.renderEmail()}
            {this.renderPassword()}
            <button className="submit-btn" type="submit">{isLoading?"Signing in…":"Sign in"}</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage;
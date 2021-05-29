import Image from 'next/image'
import React, { Component } from 'react';
import country from '../public/country.json';
import countrytel from '../public/countrytel.json';
import countryimg from '../public/countryimg.json';
import Router from 'next/router';
import Header from './Header';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.otparr=[]
    this.state = {
      PersonalSection: true,
      CompanyDetailsSection: false,
      MailSection: false,
      ShowErr:false,
      ErrMsg:"",
      ShowErrone:false,

      country: country.countries,
      stateList: "",
      dial_code: "",
      countryImg: "",
      Name: "",
      Gender: "male",
      Country: "",
      States: "",
      Phone: "",

      Image: '',
      companyName: '',
      emailId: '',
      jobTitle: '',
      YearOfExperience: '',
      terms: false,

      OTP:[],
    }
    this.initialState = this.state
    this.myRef = React.createRef();
  }
  componentDidMount(){
    document.getElementById("nextBtn").disabled = true;
  }
  componentDidUpdate(){
    
    if(document.getElementById("nextBtn") && this.state.Name && this.state.Gender && this.state.Country && this.state.States && this.state.Phone){
      document.getElementById("nextBtn").disabled = false;
    }

  if(document.getElementById("sendOTPbtn") && this.state.Image && this.state.companyName && this.state.emailId && this.state.jobTitle && this.state.YearOfExperience && this.state.terms){
    document.getElementById("sendOTPbtn").disabled = false;
  }else if(document.getElementById("sendOTPbtn") && this.state.Image === "" && this.state.companyName === "" && this.state.emailId === "" && this.state.jobTitle === "" && this.state.YearOfExperience === "" && this.state.terms == false){
    document.getElementById("sendOTPbtn").disabled = true;
  }
  if(document.getElementById("verifyBtn")){
    document.getElementById("verifyBtn").disabled = true;
  }

  }
  handleInput = (e) => {
    this.setState({ShowErrone:false,ShowErr:false,ErrMsg:""})
    if (e.target.type === "checkbox") {
      this.setState({ [e.target.name]: e.target.checked })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  GenderSelect = (e) => {
    this.setState({ Gender: e.target.value })
    var elems = document.querySelectorAll(".active");
    elems.forEach((ele) => { ele.classList.remove("active") })
    e.target.classList.add("active")
  }

  changeStates = (e) => {
    this.setState({ Country: e.target.value })

    const state = this.state.country.filter((country) => { return country.country === e.target.value ? country : '' })
    const tel = countrytel.filter((tel) => { return tel.name === e.target.value ? tel : "" })
    const img = countryimg.filter((country) => { return country.name === e.target.value ? country : "" })

    this.setState({ countryImg: img[0].flag })
    this.setState({ stateList: state[0].states })
    this.setState({ dial_code: tel[0].dial_code })
  }
  
  PersonalDetailSubmit = () => {
    if (this.state.Name === "") {
      this.setState({ShowErr:true, ErrMsg:"Please enter name"})
      return false;
    } else if (this.state.Country === "") {
      this.setState({ShowErr:true, ErrMsg:"Please select country"})
      return false;
    } else if (this.state.States === "") {
      this.setState({ShowErr:true, ErrMsg:"Please select state"})
      return false;
    } else if (this.state.Phone === "") {
      this.setState({ShowErr:true, ErrMsg:"Please enter Phone number"})
      return false;
    }else if(!(/^[0-9]{10}$/.test(this.state.Phone))){
      this.setState({ShowErr:true, ErrMsg:"Please entet 10 digit mobile number"})
      return false;
    } else {
      this.setState({ PersonalSection: false, CompanyDetailsSection: true,MailSection: false,ShowErr:true, ErrMsg:"" })
    }
  }

  ImageSelectTrigger = () => {
    this.myRef.current.click();
  };

  handleImageUpload = (event) => {
    let src = URL.createObjectURL(event.target.files[0]);
    let preview = document.getElementById("profile");
    preview.src = src;
    this.setState({ Image: src })
  }
  
  CompanyDetailsSubmit = () => {
    if (this.state.Image === "") {
      this.setState({ShowErrone:true, ErrMsg:"Please Upload image"})
      return false;
    } else if (this.state.companyName === "") {
      this.setState({ShowErrone:true, ErrMsg:"Please enter Company name"})
      return false;
    } else if (this.state.emailId === "") {
      this.setState({ShowErrone:true, ErrMsg:"Please enter EmailID"})
      return false;
    } else if((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.emailId)) == false){
      this.setState({ShowErrone:true, ErrMsg:"Enter valid EmailId"})
      return false
    }else if (this.state.jobTitle === "") {
      this.setState({ShowErrone:true, ErrMsg:"Please enter JobTitle"})
      return false;
    } else if (this.state.YearOfExperience === "") {
      this.setState({ShowErrone:true, ErrMsg:"Please enter YearOfExperience"})
      return false;
    } else if (!this.state.terms) {
      this.setState({ShowErrone:true, ErrMsg:"Please Accept the terms and condition"})
      return false;
    } else {
      this.setState({PersonalSection: false,CompanyDetailsSection: false, MailSection: true,ShowErrone:true, ErrMsg:"" })
    }
  }

  clickEvent = (e, val) => {
    if (e.target.value) {
      if(this.otparr.length < 5){ this.otparr.push(e.target.value)}
      let id = parseInt(val) + 1
      if(id <= 5){document.getElementById(id.toString()).focus();}
    }
    if(e.key === "Backspace"){
       this.otparr.pop()
       let id = parseInt(val) - 1
       if(id>=1){document.getElementById(id.toString()).focus()}
    }
    if(this.otparr.length >= 5){
      document.getElementById("verifyBtn").disabled = false;
    }else{
      document.getElementById("verifyBtn").disabled = true;
    }
  }
  verifySubmit=()=>{
    let otp = ""
    this.otparr.map((num)=>{
      otp += num
    })
    let dataObject ={
      Name: this.state.Name,
      Gender: this.state.Gender,
      Country: this.state.Country,
      States: this.state.States,
      Phone: this.state.Phone,
      Image: this.state.Image,
      companyName: this.state.companyName,
      emailId: this.state.emailId,
      jobTitle: this.state.jobTitle,
      YearOfExperience: this.state.YearOfExperience,
      terms: this.state.terms,
      OTP:parseInt(otp),
    }
    localStorage.setItem("data",JSON.stringify(dataObject))
    this.setState({
      ShowErr:false,
      ErrMsg:"",
      ShowErrone:false,
      country: country.countries,
      stateList: "",
      dial_code: "",
      countryImg: "",
      Name: "",
      Gender: "male",
      Country: "",
      States: "",
      Phone: "",
      Image: '',
      companyName: '',
      emailId: '',
      jobTitle: '',
      YearOfExperience: '',
      terms: false,
      OTP:[]
    })
    Router.push('/Success')
  }

  ComapnyBackBtn=()=>{
    this.setState({PersonalSection: true,CompanyDetailsSection: false, MailSection: false,ShowErrone:false,ShowErr:false,ErrMsg:""})
  }
  MailBackBtn=()=>{
    this.setState({PersonalSection: false,CompanyDetailsSection: true, MailSection: false,ShowErrone:false,ShowErr:false,ErrMsg:""})
  }
  render() {
    return (
      <div >
        <Header data={"Home"}/>
        <div style={{ height: "100vh", width: "100%" }}>
          <ul className="nav justify-content-around p-2">
            <li className="nav-item ml-5" style={{color:this.state.PersonalSection ? "#ffffff" : "rgba(255, 255, 255, 0.7)"}}>
              <img src={this.state.PersonalSection ? "images/orangeone.svg" : "images/tick.svg"} className="mr-2"></img>
                Personal Details
             </li>
            <li className="nav-item" style={{color:this.state.CompanyDetailsSection ? "#ffffff" : "rgba(255, 255, 255, 0.7)"}}>
              <img src={this.state.CompanyDetailsSection ? "images/orangetwo.svg" : this.state.MailSection ? "images/tick.svg":"images/normaltwo.svg"} className="mr-2"></img>
                Company Details
            </li>
            <li className="nav-item mr-5" style={{color:this.state.MailSection ? "#ffffff" : "rgba(255, 255, 255, 0.7)"}}>
              <img src={this.state.MailSection ? "images/orangethree.svg" : "images/normalthree.svg"} className="mr-2"></img>
                Email Verification
            </li>
          </ul>
          <div className="container-fluid">
            <div className="row">
              <div className="col emptycol"></div>
              <div className="col mt-3">
                {/* ------------------------------------PersonalDetails------------------------------> */}
                {this.state.PersonalSection ?
                  <div>
                    <h3><strong>Add Your Personal Details</strong></h3>
                    <h6>Lorem ipsum is simply dummy text of the printing the typesetting industry.</h6>
                    <form className="white-bg" onSubmit={() => { this.clickfun() }}>
                      {this.state.ShowErr ?  <div className="error">{this.state.ErrMsg}</div> : ""}
                      <div className="form-group">
                        <label for="inputAddress">Full name</label>
                        <input type="text" className="form-control form-control-sm" autoComplete="off" id="inputAddress" placeholder="Name" name="Name" onChange={(e) => { this.handleInput(e) }} value={this.state.Name} />
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <div className="d-flex">
                          <button className="genderSelector active" type="button" value="male" onClick={(e) => { this.GenderSelect(e) }}> Male</button>
                          <button className="genderSelector" type="button" value="female" onClick={(e) => { this.GenderSelect(e) }}> Female</button>
                          <button className="genderSelector" type="button" value="others" onClick={(e) => { this.GenderSelect(e) }}>Others</button>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Country</label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"#fff"}}><img src={this.state.countryImg} style={{ width: "15px", height: "15px", borderRadius: "50%" }}></img></span>
                          </div>
                          <select className="form-control form-control-sm" id="inputGroupSelect01" style={{ borderLeft: "none" }} onChange={(e) => { this.changeStates(e) }} value={this.state.Country}>
                            <option value="">Choose</option>
                            {this.state.country && this.state.country.map((country,i) => (
                              <option value={country.country} key={i}>{country.country}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="inputState">State</label>
                        <select id="inputState" className="form-control form-control-sm" name="States" onChange={(e) => { this.handleInput(e) }} value={this.state.States}>
                          <option value="">Choose</option>
                          {this.state.stateList && this.state.stateList.map((state,i) => (
                            <option value={state} key={i}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label for="inputAddress">Phone</label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label className="input-group-text p-1" autoComplete="off" id="basic-addon1"><img src={this.state.countryImg} style={{ width: "15px", height: "15px", borderRadius: "50%", marginRight: "5px" }}></img><span className='dialno'><strong>{this.state.dial_code}</strong></span></label>
                          </div>
                          <input type="number" maxLength="10" className="form-control form-control-sm" placeholder="Phone no" aria-label="Username" aria-describedby="basic-addon1" id="inputAddress" name="Phone" onChange={(e) => { this.handleInput(e) }} value={this.state.Phone} style={{borderLeft:"none"}}/>
                        </div>
                      </div>
                      <button type="button" className="btn btn btn-block" id="nextBtn" onClick={() => { this.PersonalDetailSubmit() }}>Next</button>
                    </form>
                    <p className="text-center">Already have an account? <span>Log in</span></p>
                  </div>
                  : ""}

                {/* ------------------------------------CompanyDetails------------------------------> */}
                {this.state.CompanyDetailsSection ? <div>
                  <h3><strong>Add Your Company Details</strong></h3>
                  <h6>Lorem ipsum is simply dummy text of the printing the typesetting industry.</h6>
                  <form className="white-bg">
                  {this.state.ShowErrone ?  <div className="error">{this.state.ErrMsg}</div> : ""}
                    <div className="d-flex align-items-center">
                      <img src={this.state.Image ? this.state.Image : "/images/img.svg"} style={{ height: '70px', width: '70px', borderRadius: "50%" }} alt="uploadimg" id="profile"></img>
                      <span className="pl-3" onClick={() => { this.ImageSelectTrigger() }}>Upload your company logo</span>
                      <input style={{ display: "none" }} ref={this.myRef} onChange={(e) => { this.handleImageUpload(e) }} type="file" accept="image/*" />
                    </div>
                    <div className="form-group">
                      <label for="inputAddress">Company name</label>
                      <input type="text" className="form-control form-control-sm"autoComplete="off" id="inputAddress" name="companyName" onChange={(e) => { this.handleInput(e) }} value={this.state.companyName}/>
                    </div>
                    <div className="form-group">
                      <label for="inputAddress">Email Id</label>
                      <input type="email" className="form-control form-control-sm" autoComplete="off" id="inputAddress" name="emailId" onChange={(e) => { this.handleInput(e) }} value={this.state.emailId}/>
                    </div>
                    <div className="form-group">
                      <label for="inputAddress">Job Title</label>
                      <input type="text" className="form-control form-control-sm" autoComplete="off" id="inputAddress" name="jobTitle" onChange={(e) => { this.handleInput(e) }} value={this.state.jobTitle}/>
                    </div>
                    <div className="form-group">
                      <label for="inputAddress">Years of Experience</label>
                      <input type="number" className="form-control form-control-sm" autoComplete="off" id="inputAddress" name="YearOfExperience" onChange={(e) => { this.handleInput(e) }} value={this.state.YearOfExperience}/>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" name="terms" onChange={(e) => { this.handleInput(e) }} checked={this.state.terms}/>
                        <label className="form-check-label" for="exampleCheck1">I accept the <span>Term and Condition</span></label>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-sm-3">
                        <button type="button" className="btn btn graybtn " onClick={() => { this.ComapnyBackBtn() }}><strong>Back</strong></button>
                      </div>
                      <div className="col">
                        <button type="button" className="btn btn btn-block" id="sendOTPbtn" onClick={() => { this.CompanyDetailsSubmit() }}>Send OTP</button>
                      </div>
                    </div>
                  </form>
                </div> : ""}

                {/* ------------------------------------MailVerification------------------------------> */}
                {this.state.MailSection ?
                  <div>
                    <h3><strong>Enter Your OTP</strong></h3>
                    <p className="text-center pb-3">For your security, we need to verify your identity. We sent a 5-digit code to <strong>name@domain.com.</strong> Please enter it below.</p>
                    <form className="white-bg">
                      <div className="form-group">
                        <label for="inputAddress">Enter Your Code</label>
                        <div className="d-flex justify-content-between">
                          <input type="text" className="form-control form-control-lg mr-4 pb-4 pr-0" id="1" maxLength="1" onKeyUp={(e) => { this.clickEvent(e, "1") }} autoComplete="off"/>
                          <input type="text" className="form-control form-control-lg mr-4 pb-4 pr-0" id="2" maxLength="1" onKeyUp={(e) => { this.clickEvent(e, "2") }} autoComplete="off"/>
                          <input type="text" className="form-control form-control-lg mr-4 pb-4 pr-0" id="3" maxLength="1" onKeyUp={(e) => { this.clickEvent(e, "3") }} autoComplete="off"/>
                          <input type="text" className="form-control form-control-lg mr-4 pb-4 pr-0" id="4" maxLength="1" onKeyUp={(e) => { this.clickEvent(e, "4") }} autoComplete="off"/>
                          <input type="text" className="form-control form-control-lg pb-4 pr-0" id="5" onKeyUp={(e) => { this.clickEvent(e, "5") }} maxLength="1" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-sm-3">
                          <button type="button" className="btn btn graybtn" onClick={()=>{ this.MailBackBtn() }}><strong>Back</strong></button>
                        </div>
                        <div className="col">
                          <button type="button" className="btn btn btn-block" id="verifyBtn" onClick={()=>{this.verifySubmit()}}>Verify</button>
                        </div>
                      </div>
                      <hr />
                      <p className="text-center" style={{color:"rgba(10, 9, 9, 0.6)"}}>Didn’t receive the email? Check your spam filter for an email from <span>name@domain.com</span></p>
                    </form>
                  </div>
                  : ''}
              </div>
              <div className="col emptycol"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

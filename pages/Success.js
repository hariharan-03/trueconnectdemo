import React from 'react';
import Head from 'next/head';
import Image  from 'next/image';
import {Link} from "next/link";
import Router from 'next/router';
import Header from './Header';



export default function Success() {

    return (
        <div>
        <Header data={"Success"}/>
        <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-12 text-center mt-5"> 
                <img src="images/Check.png"></img>
                <h1 style={{fontSize:"50px"}}>Registration Completed</h1>
                <p>Thank you for filling our form.<br/>You will receive your first mail withnin the next 24 hours.</p>
                <hr/>
               <span onClick={()=>{Router.push('/')}}>go to home page</span>
                </div>
            </div>
       
        </div>
        </div>
    )
}

import React, { useState } from 'react'
import './login.css'
import axios from 'axios';
import DialogueBox from '../DialogueBox';
import Cookies from 'js-cookie'

function Login() {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [conpass, setConpass] = useState('');
    const [diagType, setDiagType] = useState('normal');
    const [diagMsg, setDiagMsg] = useState('');
    const [diagOpen, setDiagOpen] = useState(false);

    const handleExist = () => { 
        Cookies.set('email', email, { expires: 7 });
        window.location.reload()
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {    
            await axios.put(`${process.env.REACT_APP_BASE_URL}/user/login`, {email, pass})
            .then(res => {
                (res.data.message === 'exist') ? handleExist() : setDiagType('red')
                if(res.data.message !== 'exist'){
                    setDiagOpen(true)
                    setDiagMsg(res.data.message)
                }
            })
        } catch(e) {
            console.log(e)
            setDiagOpen(true)
            setDiagMsg('Unexpected error occurred')
            setDiagType('red')
        } finally{
            setTimeout(()=>setDiagOpen(false), 3000)
            setDiagType(0)
        }
    }

    const handleSignup = async (e) => {
      e.preventDefault()
      if(pass !== conpass){
        setDiagType('red')
        setDiagMsg('Passwords doesn\'t match')
        setDiagOpen(true)
        setTimeout(() => {setDiagType('normal'); setDiagOpen(false)}, 3000)
      }
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, {email, pass})
        .then(res => {
            if(res.data.message !== 'Registration successful')
                setDiagType('red')
            setDiagMsg(res.data.message)
            setDiagOpen(true);
            if(res.data.message === 'Registration successful')
                setTimeout(() => {window.location.reload();}, 3001)
        })
      } catch (error) {
            console.log(error)
            setDiagType('red')
            setDiagMsg('Unexpected error occurred')
      } finally{
        setDiagType('normal')
        setTimeout(() => {setDiagOpen(false)}, 3000)
      }
    }

  return (
    <center>
        {diagOpen && <DialogueBox msg={diagMsg} type={diagType}/>}
        <div class="wrapper">
            <div class="card-switch">
                <label class="switch">
                <input type="checkbox" class="toggle"/>
                <span class="slider"></span>
                <span class="card-side"></span>
                <div class="flip-card__inner">
                    <div class="flip-card__front">
                        <div class="title">Log in      </div>
                        <form class="flip-card__form" action="">
                            <input class="flip-card__input" required name="email" placeholder="Email" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                            <input class="flip-card__input" required name="password" placeholder="Password" type="password" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
                            <button class="flip-card__btn" onClick={handleLogin}>Let`s go!</button>
                        </form>
                    </div>
                    <div class="flip-card__back">
                        <div class="title">Sign up</div>
                        <form class="flip-card__form" action="">
                            <input class="flip-card__input" required value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" type="name"/>
                            <input class="flip-card__input" required value={pass} onChange={(e) => {setPass(e.target.value)}} name="password" placeholder="Password" type="password"/>
                            <input class="flip-card__input" required value={conpass} onChange={(e) => {setConpass(e.target.value)}} name="password" placeholder="Confirm Password" type="password"/>
                            <button class="flip-card__btn" onClick={handleSignup}>Confirm!</button>
                        </form>
                    </div>
                </div>
                </label>
            </div>   
        </div>
    </center>
  )
}

export default Login

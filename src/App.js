import React, {useState, useEffect} from 'react'
import './App.css'

function App() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [serieCount,setSerieCount] = useState(0)
  const [isClicked, setIsClicked] = useState(0)

  const time = ( parseInt(minutes) * 60 ) + parseInt(seconds)
  let isTriggeredByTimer = Boolean(false)
 
 /* console logs
 console.log(`time: ${time}`)
  console.log(`secs: ${seconds}`)
  console.log(`mins: ${minutes}`)
  */

  function handleSubmit(event){
    event.preventDefault()
  //alert(`You entered ${time}`)
  }
  
  function handleChangeMinutes(event){
    event.preventDefault()
    setMinutes(event.target.value)
  }

  function handleChangeSeconds(event){
    event.preventDefault()
    setSeconds(event.target.value)
  }
  function handleReset(event){
    event.preventDefault()
  }
  function handleChangeResCheck(){
    setIsClicked(!isClicked)
  }

  function toggle(){
    setIsActive(!isActive)
    if(!isActive){
    setSerieCount( serieCount=> serieCount+1 )}
  }
  
  function reset(){
    setSeconds(0)
    setMinutes(0)
    setIsActive(false)
    if(isClicked){setSerieCount(0)}
  }
  useEffect(() =>{
    let interval = null
    if(isActive) {
      interval= setInterval(()=>{
        setSeconds(time => time-1) 
      },1000)
     if(time === 0){
           isTriggeredByTimer = Boolean(true)
         }}
      else if (!isActive && time !==0){
        clearInterval(interval)
      }
      if(time ===0 && isTriggeredByTimer){
        clearInterval(interval)
        setIsActive(false)
        alert('Time is gone!')
      }
      return ()=>clearInterval(interval)
  },[isActive, isTriggeredByTimer, time])

  function displayTime(){
    let minutes = Math.floor(time/60)
    //console.log(`Time: ${time} minutes: ${minutes}`)
    let seconds = time - minutes *60
    if(time < 60){
      return `${seconds} s`
    }else if(time>=60){
      return `${minutes} min ${seconds} s`
    }
  }   
  
  function timeOptions(string){
    let timeNumbers = []
    for (let i = 0; i<=59;i++){
      timeNumbers.push(i)
    }
    const timeOptions = timeNumbers.map((number)=><option key={number.toString()} value={number}>{number} {string}</option>)
    return timeOptions
  }
  
  return (
    <div className="app">
    <div className="time">
      {displayTime()}
    </div>
    <div className="row">
      <form className="submitForm" onSubmit={handleSubmit}>
      <div>Counter value: {serieCount}</div>
      <label htmlFor = "timeSet">Set Time: </label>
      <select id='timeSetMins' className = "select-custom" name='mins' value = {minutes} onChange={handleChangeMinutes}>
        {timeOptions('min')}
      </select>
      <select id='timeSetSeconds' className = "select-custom" name='secs' value = {seconds} onChange={handleChangeSeconds}>
        {timeOptions('s')}
      </select><br/>
      <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} disabled={time === 0} onClick={toggle}>
        {isActive ? 'Pause' : 'Start'}
      </button><button className="button button-reset" onSubmit={handleReset} onClick = {reset}>
        Reset
      </button></form>
     
      <label className="container"><input type="checkbox" id="countReset"  onClick={handleChangeResCheck}/><span className="checkmark"></span></label>
      <label htmlFor="countReset" className="countreset-label">Reset counter</label>
    </div>
  </div>)
}
export default App

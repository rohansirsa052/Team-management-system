import React from 'react'
import "./card.css";

const Card = ({data}) => {
  return (
    <React.Fragment>
    {data.map((CValue) => (
        <div className="wrapper" key= {CValue.id} >
        <div className="user-card">
            <div className="user-card-img">
              <img src={CValue.avatar} alt=""/>
            </div>
            <div className="user-card-info">
              <h2> {`${CValue.first_name} ${CValue.last_name}`} </h2>
              <p><span>Email:</span> {CValue.email} </p>
              <p><span>Gender:</span> {CValue.gender} </p>
              <p><span>Domain:</span> {CValue.domain} </p>
              <p><span>Availbility :</span> {CValue.available ? "True": "False" } </p>
            </div>
        </div>
    </div>
      
      ))}
    
   
    </React.Fragment>
  )
}

export default Card;

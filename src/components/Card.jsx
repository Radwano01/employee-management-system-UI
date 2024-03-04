import React from 'react'
import "../style/Card.scss"

const Card = ({Title, Total}) => {
  return (
    <div className="card">
        <div className="title">
            <h2>{Title}</h2>
        </div>
        <div className="desc">
            <h3>Total:</h3>
            <h3>{Total}</h3>
        </div>
    </div>
  )
}

export default Card
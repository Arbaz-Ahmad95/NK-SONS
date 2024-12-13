import React from 'react'
import './descriptionbox.css'
const DescriptionBox=()=>{
    return(
        <div className='descriptionbox'>
          <div className="descriptionbox-navigator">
              <div className="descriptionbox-nav-box">
                  Description
              </div>
              <div className="descriptionbox-nav-box fade">
                  REviews(122)
              </div>
          </div>

          <div className="descriptionbox-description">
                  <p>An e-commerce website is an online platform that facilitate buying 
                      and selling of product or services over the internet 
                      serves as a vertual marketplace where business and indiviual show case 
                      thier product interact with customer and condusct transactins
                      without the need of physical presenece .
                  </p>
          </div>
        
        </div>
    )
}
export default DescriptionBox
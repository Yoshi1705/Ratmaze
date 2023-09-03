import React from 'react'

function Footer() {
  return (
     <footer>
        <div className=" container d-md-flex py-4">
        <div className="me-md-auto text-center  ">
          <div className="copyright" style={{marginTop:'15px'}}>
            ©YoshiSpace {new Date().getFullYear()} All Rights Reserved
          </div>
           
        </div>
      </div>
     </footer>
  )
}

export default Footer
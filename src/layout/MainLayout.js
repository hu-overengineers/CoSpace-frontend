import React from 'react';
import PrimaryAppBar from "../component/PrimaryAppBar";

export default function MainLayout({ children }) {

  return (
    <div>

      <PrimaryAppBar/>
      
      {/* side drawer */}
      {/* <div>side drawer</div> */}

      {/* main content */}
      <div>
        { children }
      </div>
    </div>
  )
}
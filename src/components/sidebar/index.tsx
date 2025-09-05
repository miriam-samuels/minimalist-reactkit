function Sidebar() {
   return (
      // <div className="col-md-3 col-xl-2 left-sidebar">
      <div className="left-sidebar" style={{width:"fit-content"}}>
         <div className="logo-wrapper">
            <h4>Minimalist Reactkit</h4>
         </div>
         <h5 className="left-menu-title">Setup</h5>
         <ul className="left-menu">
            <li><a href="#introduction"> Introduction </a></li>
            <li><a href="#packageInstallation"> Package Installation </a></li>
            <li><a href="#getStarted"> Get Started </a></li>
         </ul>
     
         <h6 className="left-menu-title">Components</h6>
         <ul className="left-menu">
            <li><a href="#table"> Table </a></li>
            <li><a href="#form"> Form </a></li>
            <li><a href="#inputField"> Input Field </a></li>
            <li><a href="#search-select"> Search Select </a></li>
            <li><a href="#accordion"> Accordion </a></li>
            <li><a href="#modal"> Modal </a></li>
            <li><a href="#otp"> OTP Input </a></li>
            <li><a href="#toggle"> Toggle </a></li>
            <li><a href="#tab"> Tab </a></li>

         </ul>

         <h6 className="left-menu-title">Other Information</h6>
         <ul className="left-menu">
            <li><a href="#customerSupport"> Customer Support </a></li>
         </ul>
      </div>
   )
}

export default Sidebar
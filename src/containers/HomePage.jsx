// This is an example page. Use this as your guideline when you make your own page.

// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

//import './../styles/materialize.css'
// Be sure to rename your className name
class HomePage extends React.Component {
    render() {
        return (

        <div>

           <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
    <div className="nav-wrapper container">
      <a id="logo-container" href="#" className="brand-logo"><img src="img/CMSC_Prince_wbox.png" alt="logo" style={{height:'40px',width:'40px'}}/>Pickr</a>
      <ul className="right hide-on-med-and-down">

        <li><a href="classNamepanel.html">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a id="classNameDD">classes</a></li>
      </ul>

      <ul id="nav-mobile" className="side-nav">
        <li><a href="index.html#about">About</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
    </div>
  </nav>
    
 <div id="main">
  {/* <!-- START WRAPPER -->*/} 
    <div class="wrapper">

      
     {/* <!-- //////////////////////////////////////////////////////////////////////////// -->*/}

      {/*<!-- START CONTENT -->*/}
      <section id="content">        

        {/*<!--start container-->*/}
        <div class="container">

          <div id="profile-page" class="section">
            {/*<!-- profile-page-header -->*/}
            <div id="profile-page-header" class="card">
                
                <figure class="card-profile-image">
                    <img src="img/defaultPP.png" alt="profile image" class="circle z-depth-2 responsive-img activator" style={{width:'20%',height: '20%'}}/>
                </figure>
                <div class="card-content">
                  <div class="row">                    
                    <div class="col s3 offset-s2">                        
                        <h4 class="card-title grey-text text-darken-4">Roger Waters</h4>
                        <p class="medium-small grey-text">Student</p>                        
                    </div>
                    <div class="col s2 center-align">
                        <h4 class="card-title grey-text text-darken-4">10</h4>
                        <p class="medium-small grey-text">Number of times called</p>                        
                    </div>
                    <div class="col s2 center-align">
                        <h4 class="card-title grey-text text-darken-4">6</h4>
                        <p class="medium-small grey-text">Number of correct answers</p>                        
                    </div>                    
                    <div class="col s2 center-align">
                        <h4 class="card-title grey-text text-darken-4">53.74564%</h4>
                        <p class="medium-small grey-text">Chances to be called</p>                        
                    </div>                    
                    <div class="col s1 right-align">
                      <a class="btn-floating activator waves-effect waves-light darken-2 right">
                          <i class="mdi-action-perm-identity"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="card-reveal">
                <br/>
                    <p>
                      <span class="card-title grey-text text-darken-4">Roger Waters <i class="mdi-navigation-close right"></i></span>
                      <span><i class="mdi-action-perm-identity cyan-text text-darken-2"></i> Student</span>
                    </p>

                    <p>This student is so bibo, like so angas in his answers pero walang point? get my point?</p>
                    
                    <p><i class="mdi-action-perm-phone-msg cyan-text text-darken-2"></i> +1 (612) 222 8989</p>
                    <p><i class="mdi-communication-email cyan-text text-darken-2"></i> mail@domain.com</p>
                    <p><i class="mdi-social-cake cyan-text text-darken-2"></i> 18th June 1990</p>
                </div>
            </div>
            {/*<!--/ profile-page-header -->*/}

           
    </div>
    {/*<!-- END WRAPPER -->*/}

  </div>
  {/*<!-- END MAIN -->*/}
  </section>
  </div>
  </div>
  </div>
        );
    }
}

// connect to redux store
export default HomePage;
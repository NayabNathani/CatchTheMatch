import React,{Component} from 'react'
import {Link} from '@material-ui/core'
import './assets/css/footer.css'
export default class Footer extends Component{

render(){
return(
    <div className="footer" 
    // justify="between"
    >
            <div className="left">
                <div className="side-links">
                    <div>
                        <Link>
                            Contact
                        </Link>
                    {/* </span>
            <span>      */}
                        <Link>
                            Help
                        </Link>
                    </div>
                </div>
                <div className="side-links link-2">
                    <div className='l'>
                        <Link>
                            @GGLabs
                        </Link>
                        <span></span>
                        <Link>
                            Terms & Conditions
                        </Link>
                        <Link>
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className='footer-right-mat'>
                    <Link href=''> 
                        <img src={require('./assets/images/fb-logo.png')} alt="" />
                    </Link>
                    <Link>
                        <img src={require('./assets/images/twitter-logo.png')} alt="" />
                    </Link>
                </div>
                <h4 className='footer-right-mat'>Powered by</h4>
                <h3 className='footer-right-mat'>GGLabs</h3>
            </div>
        </div>
)

}



}
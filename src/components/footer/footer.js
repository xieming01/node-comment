import React, { Component } from 'react'
 import './footer.less'
// import { withRouter } from 'react-router-dom'

class Foot extends Component {
    render() {
        return (
            <div className="footer">
                <div className='chart-foot'>
                   CNode - Created By duziten | Copyright © 2018-2-1
                   <br />
                   联系人QQ：925187509 
                </div>
            </div>
        )
    }
} 

export default Foot;

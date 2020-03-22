import React from 'react'

import TopNavBar from './top-nav-bar'

class AppLayout extends React.Component{

  render(){
    const { children, history } = this.props
    return (
      <div>
        <div className='topNavBar'>
          <TopNavBar history={history}/>
        </div>
        <div className='mainContainer'>
          {children}
        </div>
      </div>
    )
  }
}

export default AppLayout

import React from 'react'


class TopNavBar extends React.Component{


  render(){
    const { history } = this.props
    return (
      <div className='navBarContent'>
        <img
          className='logo'
          src="https://assets2.kuvera.in/production/atlantis/web/assets/img/kuvera-logo-dark.svg" 
        />
        <span className='pathName'>
          {history.location.pathname}
        </span>
      </div>
    )
  }
}

export default TopNavBar
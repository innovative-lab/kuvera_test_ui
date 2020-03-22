import React from 'react'
import calssnames from 'classnames'
import AppLayout from './app-layout'

import Loader from '../components/loader'
import StatusBar from '../components/statusBar'

import BackButton from '../right-arrow.svg'
import GrowthIcon from '../earnings.svg'

const FundListURL = 'https://api.kuvera.in/api/v3/funds/'

class FundView extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      fundDetail: {},
    }
  }
  componentDidMount(){
    const fundId = this.props.match.params.fundId
    let promise = fetch(`${FundListURL}${fundId}.json`, {
      method: "GET",
    })

    promise
      .then(res => res.json())
      .then(res => {
        this.setState({
          fundDetail: res[0]
        })
      })
  }

  render(){
    const { history } = this.props

    const { fundDetail } = this.state

    console.log('this.state', this.state)
    return (
      <AppLayout history={history}>
        <div className='contentBox' 
          // onClick={() => searchKey.length ? null : this.setState({ showSearchOption: false })}
        >
          <div style={{ position: 'relative', minHeight: '500px', width: '100%'}}>
            {
              !!Object.keys(fundDetail).length ? (
                <div className='fundDetails' >
                  <div className='fundName'>
                    <img 
                      src={BackButton} 
                      className="backBtn" 
                      alt="logo"
                      onClick={() => history.goBack()} 
                    />
                    {fundDetail.name}
                    <img src={GrowthIcon} className="gIcon" alt="logo" />
                  </div>
                  <div className='fundCategory'>
                    {fundDetail.fund_category && (
                      <div style={{ display: 'flex' }}>
                        <span className='statusLabel'>Fund Category</span>
                        <StatusBar value={fundDetail.fund_category} />
                      </div>
                    )}
                    <div className='divider'/>
                    {fundDetail.fund_type && (
                      <div style={{ display: 'flex' }}>
                        <span className='statusLabel'>Fund Type</span>
                        <StatusBar value={fundDetail.fund_type} />
                      </div>
                    )}
                    <div className='divider'/>
                    {fundDetail.plan && (
                      <div style={{ display: 'flex' }}>
                        <span className='statusLabel'>Fund Plan</span>
                        <StatusBar value={fundDetail.plan} />
                      </div>
                    )}
                    <div className='divider'/>
                    {fundDetail.maturity_type && (
                      <div style={{ display: 'flex' }}>
                        <span className='statusLabel'>Maturity Type</span>
                        <StatusBar value={fundDetail.maturity_type} />
                      </div>
                    )}
                     <div className='divider'/>
                    {fundDetail.crisil_rating && (
                      <div style={{ display: 'flex' }}>
                        <span className='statusLabel'>Crisil Rating</span>
                        <StatusBar value={fundDetail.crisil_rating} />
                      </div>
                    )}
                  </div>
                  <div className='fundCategory' style={{ flexFlow: 'column', alignItems: 'flex-start'}}>
                      <div>
                        <span>Fund Manager</span>
                        <span className='value'>{fundDetail.fund_manager  }</span>
                      </div>
                      <div style={{ margin: '10px 0 0 0' }}>
                        <span>Investment Objective</span>
                        <span className='value'>{fundDetail.investment_objective  }</span>
                      </div>
                  </div>
                </div>
              ) : (
                <Loader />
              )
            }  
          </div> 
        </div>
      </AppLayout>
    )
  }
}

export default FundView
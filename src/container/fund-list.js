import React from 'react'

import AppLayout from './app-layout'
import Table from '../components/data-table'
import DropDown from '../components/dropdown'
import classnames from 'classnames'

import Loader from '../components/loader'

const FundListURL = 'https://api.kuvera.in/api/v3/funds.json'

const tableColumn = [
  {label : 'Name' , key: 'name' , isNested: false},
  {label : 'Category' , key: 'fund_category', isNested: false},
  {label : 'Type' , key: 'fund_type', isNested: false},
  {label : 'Plan' , key: 'plan', isNested: false},
  {label : 'Return in 1Yr' , key: 'year_1', isNested: true},
  {label : 'Return in 3Yr' , key: 'year_3', isNested: true},
]

class FundList extends React.Component{

  constructor(props){
    super(props)
    this.state={
      isFetchingData: false,
      totalFundSet:[],
      top100DataSet:[],
      keyToBeSorted: null,
      keyToBeFiltered: null,
      fund_category_type_val: null,
      fund_type_val: null,
      plan_type_val: null,
      fund_category_types: [],
      fund_types: [],
      plan_types: [],
      filterArray: [],
      searchOption: [{key: 'name', value: 'Name'}, {key: 'fund_category', value: 'Category'}, {key: 'fund_type', value: 'Type'}],
      showSearchOption: false,
      searchKey: '',
    }
  }

  componentDidMount(){
    let promise = fetch(FundListURL, {
      method: "GET",
    })

    this.setState({
      isFetchingData: true,
    })

    promise
      .then(res => res.json())
      .then(res => {
        this.setState({
          top100DataSet: res.slice(0,100),
          totalFundSet: res,
          isFetchingData: false
        }, function(){
          let fund_types = this.state.top100DataSet.map(d => d.fund_type)
          let fund_category_types = this.state.top100DataSet.map(d => d.fund_category)
          let plan_types = this.state.top100DataSet.map(d => d.plan)

          this.setState({
            fund_types: [...new Set(fund_types)],
            fund_category_types: [...new Set(fund_category_types)],
            plan_types: [...new Set(plan_types)],
          })

        })
      })
  }

  filter(val, key){
    console.log('[key to be filter] :', key, val)
    const { totalFundSet, filterArray, top100DataSet } = this.state

    let dupArr =  filterArray.includes(key) ?
      [...totalFundSet] :
      (filterArray.length ? [...top100DataSet] : [...totalFundSet])

    dupArr = dupArr.filter(d => d[key] === val)

    if(filterArray.length){
      filterArray.map(f => {
        dupArr = dupArr.filter(d => d[f.key] === f.val)
      })
    }

    this.setState({
      filterArray: [...this.state.filterArray, key],
      top100DataSet: dupArr.slice(0,100)
    })

    if(key === 'fund_type'){
      this.setState({
        fund_type_val: val
      })
    } else if(key === 'fund_category'){
      this.setState({
        fund_category_type_val: val
      })
    } else {
      this.setState({
        plan_type_val: val
      })
    }

    console.log('[filtered array] :', dupArr)

  }

  sort(key, isSortable){
    const { totalFundSet, filterArray, top100DataSet, } = this.state

    if(key !== this.state.keyToBeSorted && isSortable) {

      const dupArr = !filterArray.length ? [...totalFundSet] : [...top100DataSet]
      

      dupArr.sort(function(a, b){
        if(a[key] < b[key]) { return -1; }
        if(a[key] > b[key]) { return 1; }
        return 0;
      })

      this.setState({
        top100DataSet: dupArr.slice(0,100),
        keyToBeSorted: key,
      })
    }
  }

  resetFilter(){
    this.setState({
      top100DataSet: [...this.state.totalFundSet].slice(0,100),
      keyToBeSorted: '',
      keyToBeFiltered: '',
      fund_category_type_val: '',
      fund_type_val: '',
      plan_type_val: '',
      filterArray: [],
      searchKey: '',
    })
  }

  search(s,e){
    const { searchKey, top100DataSet } = this.state
    console.log('[searched]', s)
    e.stopPropagation()
    this.setState({showSearchOption: false,})

    if(searchKey.length){
      let dupArr = [...top100DataSet]
      dupArr = dupArr.filter(f => f[s.key].toLowerCase().includes(searchKey))

      this.setState({
        top100DataSet: dupArr,
        
      })
    }

  }

  setSearchKey(e){
    const { totalFundSet } = this.state
    if(!!e.target.value.length){  
      this.setState({ searchKey: e.target.value })
    } else {
      this.setState({ top100DataSet: [...totalFundSet].slice(0,100), searchKey: '' })
    }
  }

  navigateToView(id){
    
    const { history } = this.props
    history.push(`/fund/explore/${id}`)

  }

  render(){
    const { history } = this.props
    const { 
      top100DataSet, fund_types, fund_category_types, plan_types,
      fund_type_val, fund_category_type_val, plan_type_val,
      showSearchOption, searchOption, searchKey, isFetchingData,
     } = this.state

     console.log('[updated state]', this.state)

    return (
      <AppLayout history={history}>
        <div className='contentBox' 
          // onClick={() => searchKey.length ? null : this.setState({ showSearchOption: false })}
        >
            <div className='filterContainer'>
            {!!fund_types.length && 
              <DropDown
                value={fund_type_val}
                type='fund_type'
                options={fund_types}
                name='Fund Type'
                onSelect={(val, key) => this.filter(val, key)}
              />
            }
            {!!fund_category_types.length && 
              <DropDown 
                value={fund_category_type_val}
                type='fund_category'
                options={fund_category_types}
                name='Funt Category'
                onSelect={(val, key) => this.filter(val, key)}
              />
            }
            {!!plan_types.length && 
              <DropDown
                value={plan_type_val}
                type='plan'
                options={plan_types}
                name='Plan Type'
                onSelect={(val, key) => this.filter(val, key)}
              />
            }
            <div className='dropdown' >   
              <button 
                className={classnames('input', 'btn')} 
                style={{ width: '100%', marginLeft: 0 }} 
                onClick={() => this.resetFilter()}
              >
                Clear Filters  
              </button>
            </div>
            <div className='dropdown' style={{ flex: 1, marginRight: 0 }} >   
              <input 
                className='input' 
                style={{ width: '100%', marginLeft: 0 }} 
                onClick={() => {this.setState({ showSearchOption: !this.state.showSearchOption })}}
                onChange={(e) => this.setSearchKey(e)}
                onBlur={() => {
                  setTimeout(() => {
                    if(!searchKey.length) this.setState({ showSearchOption: false })
                  }, 0)
                }}
                value={searchKey}
                placeholder='Search here...'
              />
              {showSearchOption && (
                <div className='searchOption' onClick={()=> console.log('clicked')}>
                  {
                    searchOption.map(o => (
                      <div 
                        className='searchItem'
                        onClick={(e) => this.search(o,e)} 
                      >
                        {`Search "${!!searchKey? searchKey : ''}" in `}
                        <span style={{ color: '#7bb1b5' , fontStyle: 'italic' }}>{o.value}</span>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          </div>
          <div style={{ position: 'relative', minHeight: '500px', width: '100%'}}>
            { !isFetchingData ? (
              <React.Fragment>
                {top100DataSet.length ? (
              <Table
                onClickingName={(id) => this.navigateToView(id)}
                tableColumn={tableColumn}
                top100DataSet={top100DataSet}
                onSort={(key, isSortable) => this.sort(key, isSortable)}
              />
              ):(
                <div className='noData'>No Data Available</div>
              )}
              </React.Fragment>      
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </AppLayout>
    )
  }
}

export default FundList
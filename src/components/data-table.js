import React from 'react'
import classnames from 'classnames'

class Table extends React.Component{

  render(){
    const { tableColumn, top100DataSet, onSort, onClickingName } = this.props
    return (
      <div>
        <div className='tableHead'>
          {tableColumn && tableColumn.map(tCol => (
            <div
              data-key={tCol.key}
              data-sortable={!tCol.isNested}
              className={classnames('tableHeadCell', tCol.label === 'Name'? 'nameCell' : '')}
              onClick={e => {
                console.log('[sortable]', !!e.target.dataset.sortable)
                onSort(e.target.dataset.key, JSON.parse(e.target.dataset.sortable))
              }}
              >
              {tCol.label}
            </div>
            ) 
          )}
        </div>
        <div style={{display: 'flex', flexFlow: 'column'}}>
            {top100DataSet && !!top100DataSet.length && top100DataSet.map(f => {
              return (
                <div className='tableBodyRow' >
                  {tableColumn.map(tCol => (
                    <div 
                      className={classnames('tableBodyCell', tCol.label === 'Name'? 'nameCell' : '' )}
                      onClick={() => {
                        if(tCol.label === 'Name'){
                          onClickingName(f.code)
                        }
                      }}
                    >
                      {!tCol.isNested ? f[tCol.key] : f.returns[tCol.key]}
                    </div>
                  )
                  )}
                </div>
              )
            })}
          
        </div>
      </div>
    )
  }
}

export default Table
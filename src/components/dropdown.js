import React from 'react'
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

class DropDown extends React.Component{

  onSelect({ item }, type) {
    console.log('props',type) 
    console.log(`selected`, item.props.children);
  }
  
  onVisibleChange(visible) {
    console.log(visible);
  }

  render(){
    const { options, name, type, onSelect, value } = this.props
    const menu = (
      <Menu onSelect={(obj) => onSelect(obj.item.props.children, type)}>
        {options && options.map((o,i) => (<MenuItem key={i}>{o}</MenuItem>))}
      </Menu>
    );

    return (
      <div className='dropdown'>
        <div className='dropdownFields'>{name}</div>
        <Dropdown
          trigger={['click']}
          overlay={menu}
          animation="slide-up"
          onVisibleChange={this.onVisibleChange}
        >
          <input className='input' placeholder='Choose one' value={value}/>
        </Dropdown>
      </div>
    )
  }
}

export default DropDown
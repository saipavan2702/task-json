import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, textinAdd}) => {
    
  return (
    <div className='header'>
      <h1>{title}</h1>
      <Button text={textinAdd? 'Close' : 'Add'} color={textinAdd? 'red' : 'green'} onClick={onAdd}/>
    </div>
  )
}
Header.defaultProps={
 title:'Task Tracker',
}
Header.propTypes={
    title:PropTypes.string.isRequired,
}

export default Header

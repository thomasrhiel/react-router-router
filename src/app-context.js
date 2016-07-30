import React from 'react'

const { func } = React.PropTypes
export default React.createClass({

  childContextTypes: {
    insertCss: func
  },

  getChildContext() {
    return {
    	insertCss: this.props.insertCss
    }
  },

  render() {
  	return (
  		<div>
	  		{this.props.children}
  		</div>
  	)
  }

})

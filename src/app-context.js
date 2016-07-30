import React from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet"

const { func } = React.PropTypes
const AppContext = React.createClass({

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
        <Helmet title={this.props.documentMeta.title} />
	  		{this.props.children}
  		</div>
  	)
  }

})

function select(state) {
  return {
    documentMeta: state.documentMeta
  }
}

export default connect(select)(AppContext)

import React from 'react'
import Script from 'react-load-script'




class Script1 extends React.Component{
    state = {
        scriptLoaded: '',
        scriptError: ''
    }

    handleScriptCreate() {
        this.setState({ scriptLoaded: false })
    }

    handleScriptError() {
        this.setState({ scriptError: true })
    }

      handleScriptLoad() {
        this.setState({ scriptLoaded: true })
    }

    render(){
        return (
            <Script
                url={this.props.url}
                onCreate={this.handleScriptCreate.bind(this)}
                onError={this.handleScriptError.bind(this)}
                onLoad={this.handleScriptLoad.bind(this)}
            />
            
        )
    }
}


export default Script1
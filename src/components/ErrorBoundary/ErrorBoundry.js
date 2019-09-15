import React, {Component} from 'react';

class ErrorBoundry extends Component {
    constructor(props){//allow access to props
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(){//Similar to try catch. If any error occur in the children this components run
        this.setState({hasError: true});
    }

    render(){
        if(this.state.hasError){
            return <h1>Oooops. That is not good</h1>
        }else{
            return this.props.children;//anything between the Error Boundary
        }
    }
}

export default ErrorBoundry;
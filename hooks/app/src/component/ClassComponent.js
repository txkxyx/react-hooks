import React from 'react';

class ClassComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {message: ''};
    }

    // DOMにレンダーされた後に実行
    componentDidMount(){
        this.setState({
            message: 'Hello World'
        });
    }

    render(){
        return(
            <div>
                { this.state.message }
            </div>
        )
    }
}

export default ClassComponent;
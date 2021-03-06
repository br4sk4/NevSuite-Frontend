import React from 'react';

export default class Home extends React.Component {

    render() {
        let elements = [];

        let components = this.props.state.home.componentInfos;

        for (let i = 0; i < components.length; ++i) {
            let iconClass = (components[i].classes === 'success') ? 'ok-sign' : 'remove-sign';
            elements.push(
                <div key={i} className={'alert alert-' + components[i].classes} role='alert'>
                    <span className={"glyphicon glyphicon-" + iconClass} />
                    <span className="componentInfoBubble">{components[i].name}: {components[i].response}</span>
                </div>
            );
        }

        return (
            <div className='componentContainer' style={{padding: '10px'}}>
                <div className="panel panel-nevsuite">
                    <div className="panel-heading">
                        <strong>Components</strong>
                    </div>
                    <div className="panel-body" style={{paddingBottom: "0"}}>
                        <form className="form-horizontal">
                            {elements}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}
import React from 'react';
import propTypes  from 'prop-types';

export default class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curIndex:0
        }
    }
    render() {
        const { titles } = this.props;
        const { curIndex } = this.state;
        return (
        <div className="tablist">
            {
                titles.map((item,index) => {
                    return (
                        <div 
                        key={item}
                        className={"tab-item " + (index === curIndex ? "active" : "")} 
                        onClick={(e) => this.itemClick(index)}
                        >
                            <span>{item}</span>
                            </div>
                    )
                })
            }
        </div>
        )
    }
    itemClick(index) {
        this.setState({
            curIndex:index
        })
        const { itemClick } = this.props
        itemClick(index)
    }
}

Tab.propTypes = {
    titles: propTypes.array.isRequired
}

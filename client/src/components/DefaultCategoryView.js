import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const DefaultCategoryViewWrapper = styled.div`
display: flex;
color: white;
font-family: 'Anonymous Pro', monospace;
flex-direction: column;
align-items: center;

img{
    width: 20em;
}
`

class DefaultCategoryView extends Component {
    render() {
        return (
            <DefaultCategoryViewWrapper>
                <h2>{this.props.category.name}</h2>
                <img src={this.props.category.image} />
                <p>{this.props.category.description}</p>
                
                <div>
                    {
                        this.props.items.map(item => <div key={item._id}>
                            <img src={item.image} />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <button onClick={() => this.props.addItem(item)}>Add Item</button>
                        </div>)
                    }
                </div>
            </DefaultCategoryViewWrapper>
        )
    }
}

export default DefaultCategoryView
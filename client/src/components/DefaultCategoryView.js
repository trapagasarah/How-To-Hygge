import React, { Component } from 'react'
import styled from 'styled-components'

const DefaultCategoryViewWrapper = styled.div`
display: flex;
color: white;
font-family: 'Anonymous Pro', monospace;
flex-direction: column;
align-items: center;
margin-bottom: 4em;

    .category-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 60%;
    }

    .item-info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 60%;
        margin-top: 1.5em;
    }

    .item-name {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h1 {
        font-size: 5em;
    }

    h2 {
        margin-bottom: 1em;
        
    }

    p {
        font-size: 2em;
        text-align: center;
    }

    img{
    width: 20em;
    margin-bottom: 1em;
    }

    button {
        background-color: rgb(187, 200, 147);
        color: white;
        border: 1px solid white;
        width: 7em;
        height: 1.5em;
        padding: 0;
        margin-right: 1em;
        margin-bottom: 2em;
    }

    button:hover{
        color: rgb(187, 200, 147);
        background-color: white;
    }

`

class DefaultCategoryView extends Component {
    render() {
        return (
            <DefaultCategoryViewWrapper>
                <div className="category-info">
                    <h1>{this.props.category.name}</h1>
                    <img src={this.props.category.image} />
                    <p>{this.props.category.description}</p>
                </div>

                <div className="item-info">
                    {
                        this.props.items.map(item => <div className="item-name" key={item._id}>
                            <button className="btn btn-primary" onClick={() => this.props.addItem(item)}>Add Item</button>
                            <h2><u>{item.name}</u>: {item.description}</h2>
                        </div>)
                    }
                </div>
            </DefaultCategoryViewWrapper>
        )
    }
}

export default DefaultCategoryView
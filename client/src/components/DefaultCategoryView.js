import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class DefaultCategoryView extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.category.name}</h2>
                <p>{this.props.category.description}</p>
                <img src={this.props.category.img} />
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
            </div>
        )
    }
}

export default DefaultCategoryView
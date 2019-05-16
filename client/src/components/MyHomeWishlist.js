import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class MyHomeWishlist extends Component {
    render() {
        return (
            <div>
                {
                    this.props.hyggeItems.map((hyggeItem, index) => <div key={index}>{hyggeItem.name}
                        <button onClick={() => this.props.deleteHyggeItem(index)}>Delete</button>
                    </div>)
                }

            </div>
        )
    }
}

export default MyHomeWishlist
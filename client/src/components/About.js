import React, { Component } from 'react'
import styled from 'styled-components'

const AboutWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: white;
    margin: 2em 0;
    font-family: 'Anonymous Pro', monospace;
    
        img {
            align-self: center;
            width: 25%;
         }
         h1 {
             font-size: 4em;
         }

         p {
             font-size: 2em;
         }
         
         .about-hygge {
             width: 40%;
         }
`

class About extends Component {
    render() {
        return (
            <AboutWrapper>
                <div className="about-hygge">
                    <h1>What is Hygge?</h1>
                    <p>"Hygge is about an atmosphere and an experience, rather than about things. It is aabout being with the people we love, A feeling of home. Aa feeling that we are safe, that we are shielded from the world and allow ouorselves to let our guard down."</p>
                </div>
                <img src="/images/about-combined.JPG" />
            </AboutWrapper>
        )
    }
}

export default About
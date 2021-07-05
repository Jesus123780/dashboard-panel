import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SmoothScroll extends Component {

    constructor(props) {
        super(props)
        const { to, behavior } = this.props
        this.state = { to, behavior }
    }

    handleClick = () => {
        const { to, behavior } = this.state

        if (to) {
            const el = document.getElementById(to)
            if (el) window.scroll({ top: el?.getBoundingClientRect()?.top || 0, left: 0, behavior: behavior || 'smooth' })
            else false
        } else throw new Error('SmoothScroll prop [to] is undefined')
    }

    render() {
        const { text } = this.props
        return (
            <button onClick={this.handleClick}>{ text }zkjl</button>
        )
    }
}

export default withRouter(SmoothScroll)
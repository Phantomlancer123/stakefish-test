import React from 'react'
import { Spin } from 'antd'

const Loading = ({ show, children, className = '' }) => {
    return show ? <Spin className={className} /> : children || null
}

export default Loading

import React from 'react'
import { useHistory } from 'react-router-dom'

import './index.scss'

const ExchangeTableButton = ({ name, id: id }) => {
    const history = useHistory()
    return (
        <div className="name-form">
            <div
                className="name-form__text"
                onClick={() => history.push(`detail/${id}`)}
            >
                {name}
            </div>
        </div>
    )
}

export default ExchangeTableButton

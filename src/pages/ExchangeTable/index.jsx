import React, { useState, useEffect } from 'react'
import { message, Table, Tag } from 'antd'

import { get } from '@/utils/request'
import { getTrustScoreColor } from '@/utils/format'
import { ERROR_TEXT, DEFAULT_PAGE_SIZE } from '@/config'

import ExchangeTableButton from './ExchangeTableButton'
import './index.scss'
const columns = [
    {
        title: 'Name',
        key: 'name',
        width: '1%',
        fixed: true,
        render: ({ name, id }) => <ExchangeTableButton name={name} id={id} />,
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        width: '20%',
    },
    {
        title: 'URL',
        key: 'url',
        dataIndex: 'url',
        align: 'left',
        width: '25%',
    },
    {
        title: 'Logo',
        key: 'image',
        width: '10%',
        render: ({ image }) => <img className="name-form__logo" src={image} />,
    },
    {
        title: 'Trust Ranke',
        dataIndex: 'trustScoreRank',
        key: 'trustScoreRank',
        align: 'center',
        width: '5%',
    },
    {
        title: 'Trust Score',
        key: 'trustScore',
        align: 'center',
        width: '10%',
        render: ({ trustScore }) => (
            <Tag color={getTrustScoreColor(trustScore)}>{trustScore}</Tag>
        ),
    },
]

const ExchangeTable = () => {
    const [exchangesTable, setExchangesTable] = useState([])
    const [pagination, setPagination] = useState({ page: 1, total: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getExchangesTable(1)
    }, [])

    const getExchangesTable = (page) => {
        setLoading(true)
        get('/exchanges', { page, perPage: 10 })
            .then((response) => {
                setExchangesTable(
                    response.data.map((i) => ({
                        ...i,
                    }))
                )
                setPagination({ page, total: response.headers.total })
            })
            .catch(({ error }) => message.error(error || ERROR_TEXT))
            .finally(() => setLoading(false))
    }

    const onTableChange = (pagination) => {
        getExchangesTable(pagination.current)
    }

    return (
        <div className="main__container exchange-table">
            <Table
                scroll={{
                    scrollToFirstRowOnChange: true,
                    x: 'max-content',
                }}
                rowKey="id"
                columns={columns}
                loading={loading}
                dataSource={exchangesTable}
                pagination={{
                    pageSize: DEFAULT_PAGE_SIZE,
                    current: pagination.page,
                    total: pagination.total,
                }}
                onChange={onTableChange}
            />
        </div>
    )
}

export default ExchangeTable

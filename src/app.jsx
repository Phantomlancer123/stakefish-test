import React from 'react'
import { Layout } from 'antd'

import { Header, Content, Footer } from './components'

import 'antd/dist/antd.css'
import './style/style.scss'

const App = () => {
    return (
        <Layout className="main__layout">
            <Layout.Header className="main__header">
                <Header />
            </Layout.Header>
            <Layout.Content>
                <Content />
            </Layout.Content>
            <Layout.Footer className="main__footer">
                <Footer />
            </Layout.Footer>
        </Layout>
    )
}

export default App

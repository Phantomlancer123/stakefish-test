import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { message, Button, List } from 'antd'
import {
    FacebookOutlined,
    RedditOutlined,
    ArrowLeftOutlined,
    TwitterOutlined,
} from '@ant-design/icons'

import { ERROR_TEXT } from '@/config'
import { get } from '@/utils/request'
import Loading from '@/components/Loading'

import './index.scss'

const ExchangeDetail = () => {
    const { exChangeId } = useParams()
    const [exChangeData, setExChangeData] = useState({
        socialMediaLinks: [],
        homePageLinks: [],
    })
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        get(`/exchanges/${exChangeId}`)
            .then((response) => {
                const exChangeData = response.data
                const socialMeidas = [
                    {
                        key: 'facebookUrl',
                        icon: <FacebookOutlined />,
                        linkHanlder: (link) => link,
                    },
                    {
                        key: 'twitterHandle',
                        icon: <TwitterOutlined />,
                        linkHanlder: (name) => `https://twitter.com/${name}`,
                    },
                    {
                        key: 'redditUrl',
                        icon: <RedditOutlined />,
                        linkHanlder: (link) => link,
                    },
                ]
                exChangeData.socialMediaLinks = socialMeidas
                    .map((media) => {
                        if (exChangeData[media.key]) {
                            return {
                                ...media,
                                link: media.linkHanlder(
                                    exChangeData[media.key]
                                ),
                            }
                        }
                        return media
                    })
                    .filter((i) => i.link)
                const urlKeys = ['url', 'otherUrl1', 'otherUrl2']
                exChangeData.homePageLinks = urlKeys
                    .map((key) => exChangeData[key])
                    .filter(Boolean)
                setExChangeData(exChangeData)
            })
            .catch(({ error }) => message.error(error || ERROR_TEXT))
            .finally(() => setLoading(false))
    }, [exChangeId])

    return (
        <div className="main__container">
            <div className="exchange-detail__action">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => history.push('/')}
                >
                    Back
                </Button>
            </div>
            <Loading show={loading} className="exchange-detail__loading">
                <div className="exchange-detail__layer">
                    <div className="exchange-detail__layer--normalform">
                        <p className="exchange-detail__layer--normalform__insert">
                            Nmae
                        </p>
                        {exChangeData.name}
                    </div>
                    <div className="exchange-detail__layer--normalform">
                        <p className="exchange-detail__layer--normalform__insert">
                            Country
                        </p>
                        {exChangeData.country}
                    </div>
                    <div className="exchange-detail__layer--normalform">
                        <p className="exchange-detail__layer--normalform__insert">
                            Trust Rank
                        </p>
                        {exChangeData.trustScoreRank}
                    </div>
                    <div className="exchange-detail__layer--normalform">
                        <img
                            src={exChangeData.image}
                            alt={`${exChangeData.name} logo`}
                        />
                    </div>
                    <div className="exchange-detail__layer--normalform">
                        <p className="exchange-detail__layer--normalform__insert">
                            Year of establishmet
                        </p>
                        {exChangeData.yearEstablished}
                    </div>
                    <div className="exchange-detail__layer--normalform">
                        <p className="exchange-detail__layer--normalform__insert">
                            Social Media
                        </p>
                        {exChangeData.socialMediaLinks.map((socialMedia) => (
                            <div
                                className="exchange-detail__icon"
                                key={socialMedia.key}
                                onClick={() =>
                                    window.open(socialMedia.link, '_target')
                                }
                            >
                                {socialMedia.icon}
                            </div>
                        ))}
                    </div>
                    <div className="exchange-detail__layer--descriptionform">
                        <p className="exchange-detail__layer--descriptionform__insert">
                            Description
                        </p>
                        <List
                            className="exchange-detail__list"
                            dataSource={exChangeData.statusUpdates}
                            locale={{
                                emptyText: 'No Data',
                            }}
                            renderItem={(item, index) => (
                                <List.Item>{item.description}</List.Item>
                            )}
                        />
                    </div>
                </div>
            </Loading>
        </div>
    )
}

export default ExchangeDetail

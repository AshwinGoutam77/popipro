import React from 'react'

export default function Documents({ Titles, card }) {
    return (card?.card_documents !== null &&
        Titles?.card_documents?.is_active !== 0 && card?.card_documents?.length !== 0 && <div className="box-content boxxx">
            <div className="flex-header">
                <h2 className="title title--h1 first-title title__separate">
                    {Titles?.card_documents?.visible_name}
                </h2>
            </div>

            <div className="document-section">
                {card?.card_documents && card?.card_documents?.map((item, index) => {
                    return (
                        <div className='document-div' key={index}>
                            <a href={card?.base_url + item?.details?.path}><img src="../../static/img/document-icon.png" alt="document" /></a>
                            <a href={card?.base_url + item?.details?.path} target='_blank'>{item?.title}</a>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

import React from 'react'

export default function Documents({ Titles, card }) {
    return (
        <>
            {card?.card_description !== null &&
                Titles?.card_description?.is_active !== 0 && <div className="box-content boxxx">
                    <div className="flex-header">
                        <h2 className="title title--h1 first-title title__separate">
                            Important Documents
                        </h2>
                    </div>

                    <div className="document-section">
                        <div className='document-div'>
                            <img src="../../static/img/document-icon.png" alt="document" />
                            <a href='#'>Anual Reports</a>
                        </div>
                        <div className='document-div'>
                            <img src="../../static/img/document-icon.png" alt="document" />
                            <a href='#'>Billing Reports</a>
                        </div>
                        <div className='document-div'>
                            <img src="../../static/img/document-icon.png" alt="document" />
                            <a href='#'>Project Reports</a>
                        </div>
                    </div>

                </div>}
        </>
    )
}

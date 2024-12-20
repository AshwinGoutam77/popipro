'use client'
import { showToast } from '@components/Dashboard/Toast'
import { useAuthContext } from '@context/AuthContext'
import { faLock, faRightToBracket } from '@node_modules/@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome'
import Api from '@services/Api'
import { CardData } from '@services/Routes'
import React from 'react'
import { useState } from 'react'

export default function LockedSection({ name, Title, profile }) {
    const { fetchData, data } = useAuthContext();
    const [Password, setPassword] = useState("")
    const handleSubmit = async () => {
        if (Password == data?.data?.company_setting?.card_section_passcode) {
            let titles = [
                {
                    name: name,
                    visible_name: Title,
                    is_locked: 0,
                },
            ];
            const response = await Api(CardData, { titles });
            if (response?.data?.status) {
                showToast(response.data?.message, 'success');
                fetchData(profile);
            }
        } else {
            showToast('Incorrect OTP', 'error');
        }
    }
    return (
        <div className="box-content boxxx" id="card_services" style={{ minHeight: '170px' }}>
            <h2 className="title title--h1 first-title title__separate">
                {Title}
            </h2>
            <div
                className="text-center m-0 dashboard-overlay-div d-flex align-items-left justify-content-end flex-column"
                style={{ top: '0', left: '0' }}
            >
                <div className='password-section'>
                    <span>This section is locked by the owner. To unlock this section enter password.</span>
                    <div className='password-input-section'>
                        <input type="text"
                            placeholder='Enter password'
                            className='form-control w-auto'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faRightToBracket} onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}

'use client';
import { useState } from 'react';
import BusinessDayRow from './BusinessDayRow';
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome';
import { faArrowUp } from '@node_modules/@fortawesome/free-solid-svg-icons';
import LockedSection from "./LockedSection";

export default function BusinessHoursConfig({ Data, Titles, card }) {
    const [isLocked, setIsLocked] = useState(Titles?.card_timings?.is_locked !== 0);
    const allDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];
    const getFullDayName = (shortDay) => {
        const map = {
            mon: 'Monday',
            tue: 'Tuesday',
            wed: 'Wednesday',
            thu: 'Thursday',
            fri: 'Friday',
            sat: 'Saturday',
            sun: 'Sunday',
        };
        return map[shortDay] || shortDay;
    };

    const formatTo12Hour = (time) => {
        if (!time) return '';
        const [hour, minute] = time.split(':').map(Number);
        const ampm = hour >= 12 ? 'pm' : 'am';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute.toString().padStart(2, '0')}${ampm}`;
    };

    const timingMap = {};
    Data?.card_timings?.forEach(item => {
        const fullDay = getFullDayName(item.day);
        timingMap[fullDay] = item;
    });

    return (
        Titles?.card_timings.source !== 0 &&
        card?.card_timings?.length !== 0 &&
        Titles?.card_timings.is_active !== 0 &&
        Titles?.card_timings?.in_subscription &&
        (isLocked ?
            (<LockedSection name="card_timings" Title={Titles.card_timings?.visible_name}
                profile={profile} setIsLocked={setIsLocked} />)

            : Titles?.card_timings.source !== 0 &&
            card?.card_timings?.length !== 0 &&
            Titles?.card_timings.is_active !== 0 &&
            Titles?.card_timings?.in_subscription && (
                <div className="box-content boxxx" id="card_blogs">
                    <div className="pb-2">
                        <h3 className="title title--h1 first-title title__separate">
                            {Titles.card_timings?.visible_name}
                        </h3>
                    </div>

                    <div className="mb-4">
                        <table className="table">
                            <thead className="bg-transparent">
                                <tr>
                                    <th className='border-0'>Day of the Week</th>
                                    <th className='border-0'>Opening Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allDays.map((day, index) => {
                                    const timing = timingMap[day];
                                    const start = timing?.start_time;
                                    const end = timing?.end_time;
                                    return (
                                        <tr key={index} className='border-0'>
                                            <td className='border-0'>{day}</td>
                                            <td className='border-0'>
                                                {start && end
                                                    ? `${formatTo12Hour(start)} - ${formatTo12Hour(end)}`
                                                    : 'Closed'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        )
    );
}
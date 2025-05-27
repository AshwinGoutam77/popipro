'use client';

import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const businessHours = [
    { day: 'Monday', hours: '9:00 AM - 5:00 PM MST' },
    { day: 'Tuesday', hours: '9:00 AM - 5:00 PM MST' },
    { day: 'Wednesday', hours: '9:00 AM - 5:00 PM MST' },
    { day: 'Thursday', hours: '9:00 AM - 5:00 PM MST' },
    { day: 'Friday', hours: '9:00 AM - 4:00 PM MST' },
];

export default function BusinessDayRow({
    day,
    enabled,
    from,
    to,
    onToggle,
    onUpdateFrom,
    onUpdateTo,
}) {
    return (
        <div className="business-hours-section row align-items-center pb-2 py-3 border-bottom">
            <div className="d-flex">
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Day of the Week</th>
                            <th>Hours of Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {businessHours.map(({ day, hours }) => (
                            <tr key={day}>
                                <td>{day}</td>
                                <td>{hours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

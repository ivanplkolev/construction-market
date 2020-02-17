import moment from 'moment'

import React from "react";

export default class Calendar extends React.Component {

    render() {

        if (!this.props.events) {
            return '';
        }

        const now = new Date();

        const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

        const currentDay = moment().format("D");

        const weekdayshort = moment.weekdaysShort();

        const weekdayshortname = weekdayshort.map(day => {
            return (
                <th class="table-light" key={day}>
                    {day}
                </th>
            );
        });

        const firstDayOfMonth = moment().startOf("month").format("d");

        const blanks = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            blanks.push(<td></td>);
        }

        const daysInMonth = [];


        const eventsDays = this.props.events.map((d) => new Date(d.fromDate).getDate());//todo filter by month


        for (let d = 1; d <= daysInCurrentMonth; d++) {
            daysInMonth.push(
                <td key={d} class={eventsDays.includes(d) ? 'table-success' : ''}>
                    <span class={d == currentDay ? 'badge badge-pill badge-danger' : ''}>{d}</span>
                </td>);
        }

        const totalSlots = [...blanks, ...daysInMonth];
        const rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });

        const calendarBody = rows.map((d, i) => {
            return <tr>{d}</tr>;
        });

        return (
            <div>
                <table class="table">
                    <thead>
                    <tr class="table-light">{weekdayshortname}</tr>
                    </thead>
                    <tbody>{calendarBody}</tbody>
                </table>
            </div>
        );
    }
}
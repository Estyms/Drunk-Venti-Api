const dayjs = require('dayjs');

export const getTimeDifferenceAsia = () => {
    const now = dayjs();
    const local = now.utcOffset();
    const serverTime = now.utcOffset(8);
    return serverTime - local;
};

function convertToNow(event){
    let start;
    if (event["timezoneDependent"]) {
        start = dayjs(event.start, 'YYYY-MM-DD HH:mm:ss').subtract(getTimeDifferenceAsia(), 'minute');
    } else {
        start = dayjs(event.start, 'YYYY-MM-DD HH:mm:ss').subtract(0, 'minute');
    }
    const end = dayjs(event.end, 'YYYY-MM-DD HH:mm:ss').subtract(0, 'minute');

    return [start, end];
}

export function isCurrentEvent(event) {
    const [start, end] = convertToNow(event);

    const timeSinceStart = -start.diff(dayjs(), 'day', true);
    const timeUntilEnd = end.diff(dayjs(), 'day', true);

    if (timeSinceStart > 0 && timeUntilEnd > 0){
        event["startTimestamp"] = start.unix();
        event["endTimestamp"] = end.unix();
        return event;
    }
}

export function isUpcomingEvent(event){
    const [start, ] = convertToNow(event);
    const timeUntilStart = start.diff(dayjs(), 'day', true);

    if (timeUntilStart > 0){
        event["startTimestamp"] = start.unix();
        event["endTimestamp"] = 0;
        return event;
    }
}

export function compareStartTimes(a, b) {
    return dayjs(a.start).diff(dayjs(b.start), 'day', true);
}

export function compareEndTimes(a, b) {
    return dayjs(a.end).diff(dayjs(b.end), 'day', true);
}
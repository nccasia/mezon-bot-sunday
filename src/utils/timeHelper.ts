import moment from "moment";

export const START_COMMAND = 'sd-timer-';
const TimerType = {
    COUNT_DOWN: '1',
    COUNTING_TIME: '2'
} as const;

const formatDuration = (duration: moment.Duration): string => {
    const parts: string[] = [];
    const timeUnits = [
        { value: Math.floor(duration.asDays()), unit: 'ngày' },
        { value: duration.hours(), unit: 'giờ' },
        { value: duration.minutes(), unit: 'phút' },
        { value: duration.seconds(), unit: 'giây' }
    ];

    timeUnits.forEach(({ value, unit }) => {
        if (value > 0) parts.push(`${value} ${unit}`);
    });

    return parts.join(' ');
};

export const timer = (string: string) => {
    const [type, timeTemplate, ...rest] = string.split('-');
    const [date, time, timezone] = timeTemplate.split(' ');
    const [year, month, day] = date.split('/');
    const [hour, minute, second] = time.split(':');

    if (!year || !month || !day || !hour || !minute || !second || !timezone) {
        return 'Không tìm thấy thời gian';
    }

    const now = moment();
    const defaultValues = {
        second: second === 'ss' ? '00' : second,
        minute: minute === 'mm' ? '00' : minute,
        hour: hour === 'hh' ? '00' : hour,
        day: day === 'dd' ? '01' : day,
        month: month === 'MM' ? '01' : month
    };

    const getAdjustedYear = (isCountingTime: boolean) => {
        if (year !== 'YYYY') return year;

        const targetDate = moment(
            `${now.year()}/${defaultValues.month}/${defaultValues.day} ${defaultValues.hour}:${defaultValues.minute}:${defaultValues.second} ${timezone}`
        );

        if (isCountingTime) {
            return !now.isBefore(targetDate) ? now.year().toString() : (now.year() - 1).toString();
        }
        return now.isBefore(targetDate) ? now.year().toString() : (now.year() + 1).toString();
    };

    const adjustedYear = getAdjustedYear(type === TimerType.COUNTING_TIME);
    const targetTime = moment(
        `${adjustedYear}/${defaultValues.month}/${defaultValues.day} ${defaultValues.hour}:${defaultValues.minute}:${defaultValues.second} ${timezone}`
    );

    if (type === TimerType.COUNTING_TIME) {
        if (!targetTime.isBefore(now)) {
            return 'Chưa tới thời gian';
        }
        const duration = moment.duration(now.diff(targetTime));
        return `${formatDuration(duration)} ${rest.join('-')}`;
    }

    if (targetTime.isBefore(now)) {
        return 'Đã qua thời gian';
    }
    const duration = moment.duration(targetTime.diff(now));
    return `${formatDuration(duration)} ${rest.join('-')}`;
}

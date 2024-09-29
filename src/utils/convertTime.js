export function convertTo12Hour(time24) {
    let [hour, minute] = time24.split(':');
    hour = parseInt(hour);

    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert hour to 12-hour format, with 12 for midnight/noon
    return `${hour}:${minute} ${ampm}`;
}


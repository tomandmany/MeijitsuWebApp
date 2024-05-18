for (let minute = 0; minute < 60; minute += interval) {
    if (hour !== 22) {
        const time = `${hour}:${minute.toString().padStart(2, '0')}`;
        options.push({ value: time, label: time });
    } else {
        const time = `${hour}:${minute.toString().padStart(2, '0')}`;
        options.push({ value: time, label: time });
        break;
    }
}
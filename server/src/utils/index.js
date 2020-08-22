module.exports = {
    convertHoursToMinutes: (time) => {
        const [hour, minutes] = time.split(':').map(Number);
        return (hour * 60) + minutes;
    }
};

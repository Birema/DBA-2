exports.isWorkingHours = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour < 17;
};
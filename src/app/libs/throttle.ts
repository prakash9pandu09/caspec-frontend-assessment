const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
    let timer: NodeJS.Timeout | null = null;
    return (...args: T) => {
        if (!timer) {
            func(...args);
            timer = setTimeout(() => {
                timer = null;
            }, limit);
        }
    };
}
export default throttle;
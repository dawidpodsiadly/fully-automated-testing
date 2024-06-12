class DateUtil {
    static getCurrentYear() {
        const currentDate = new Date();
        return currentDate.getFullYear();
    }

    static getCurrentDate() {
        return new Date();
    }
}

export const dateUtil = new DateUtil;

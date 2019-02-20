import UserSettings from "../../userSettings"

export default {
    Query : {
        userSettings(obj, arg, { userId }) {
            return UserSettings.find({ userId }).fetchOne();
        }
    }
};
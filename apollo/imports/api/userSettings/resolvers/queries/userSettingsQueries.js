import UserSettings from "../../userSettings"

export default {
    Query : {
        userSettings() {
            return UserSettings.find({}).fetch();
        }
    }
};
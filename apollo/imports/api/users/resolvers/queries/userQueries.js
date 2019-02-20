import UserSettings from "../../userSettings"

export default {
    Query : {
        user() {
            return user.find({}).fetch();
        }
    }
};
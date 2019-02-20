import UserSettings from "../../userSettings"

export default {
    Mutation: {
        insertUserSettings(obj, { userId, security_lvl }, context){
            const userSettingsId = UserSettings.insert({
                userId,
                security_lvl
            });
            return UserSettings.findOne(userSettingsId);
        }
    ,
        updateUserSettings(obj, { userId, security_lvl}, context){

        }
    }

}
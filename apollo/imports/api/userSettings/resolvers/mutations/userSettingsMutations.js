import UserSettings from "../../userSettings"

export default {
    Mutation: {
        insertUserSettings(obj, { security_lvl }, { userId }){
            const userSettingsId = UserSettings.insert({
                userId,
                security_lvl
            });
            return UserSettings.findOne(userSettingsId);
        }
        ,
        updateUserConfidentialitySettings(obj, {security_lvl}, { userId }){
            const userSettingsId = UserSettings.update({
                security_level
            })
        }
    }
}
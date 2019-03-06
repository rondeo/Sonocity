import UsersSchema from "../../api/users/schemas/User.graphql";
import UserSettingsSchema from "../../api/userSettings/schemas/USeesettings.graphql";
import AudioContentSchema from "../../api/userUpload/schemas/Audio.graphql"

const typeDefs = [UsersSchema, UserSettingsSchema, AudioContentSchema];

export default typeDefs;
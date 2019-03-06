import UsersSchema from "../../api/users/schemas/User.graphql";
import UserSettingsSchema from "../../api/userSettings/schemas/USrsettings.graphql";
import AudioContentSchema from "../../api/audioContent/schemas/AudioGr.graphql"

const typeDefs = [UsersSchema, UserSettingsSchema, AudioContentSchema];

export default typeDefs;
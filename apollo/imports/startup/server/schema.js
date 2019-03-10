import UsersSchema from "../../api/users/schemas/User.graphql";
import UserSettingsSchema from "../../api/userSettings/schemas/USrsettings.graphql";
import AudioContentSchema from "../../api/audioContent/schemas/Audiooooo.graphql"
import ListeningHistorySchema from "../../api/log/schemas/ListeningHistoo.graphql"
import LikedTracksSchema from "../../api/log/schemas/LikedAudiooooo.graphql"

const typeDefs = [UsersSchema, UserSettingsSchema, AudioContentSchema, ListeningHistorySchema, LikedTracksSchema];

export default typeDefs;
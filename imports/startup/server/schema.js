import UsersSchema from "../../api/users/schemas/Usersss.graphql";
import AudioContentSchema from "../../api/audioContent/schemas/Audiooooooooo.graphql"
import ListeningHistorySchema from "../../api/log/schemas/ListeningHistoo.graphql"
import LikedTracksSchema from "../../api/log/schemas/LikedAudioooooo.graphql"
import FollowedStationSchema from "../../api/log/schemas/FollowedStatioon.graphql"
import StationSchema from "../../api/station/schemas/Staonnnnn.graphql"
import LocationHistorySchema from "../../api/log/schemas/LocationHistoryy.graphql"
import ListeningContext from "../../api/log/schemas/ListeningContexx.graphql"
import Chatroom from "../../api/messenger/schemas/Chatroommm.graphql"
import Message from "../../api/messenger/schemas/Messageee.graphql"
import StationComment from "../../api/log/schemas/StationCommenttttt.graphql"

const typeDefs = [UsersSchema, AudioContentSchema, ListeningHistorySchema, LikedTracksSchema, 
                  FollowedStationSchema, StationSchema, LocationHistorySchema, ListeningContext, Chatroom, Message,
                  StationComment];

export default typeDefs;
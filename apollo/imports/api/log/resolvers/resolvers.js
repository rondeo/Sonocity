import merge from "lodash/merge";

import InsertLhEntry from "./mutations/insertLhEntry"
import GetAudioListenCount from "./queries/getAudioListenCount"

import InsertIntoLocationHistory from "./mutations/insertIntoLocationHistory"

import InsertLikedAudio from "./mutations/insertLikedAudio"
import RemoveLikedAudio from "./mutations/removeLikedAudio"
import IsAudioLiked from "./queries/isAudioLiked"
import GetLikedAudioByUserId from "./queries/getLikedAudioByUserId"
import GetAudioLikedCount from "./queries/getAudioLikedCount"

import InsertFollowedStation from "./mutations/insertFollowedStation"
import RemoveFollowedStation from "./mutations/removeFollowedStation"
import IsStationFollowed from "./queries/isStationFollowed"
import GetOnlineFollowedStationByUserId from "./queries/getOnlineFollowedStationByUserId"
import GetFollowedStationCount from "./queries/getFollowedStationCount"

import SetUserListeningContext from "./mutations/setUserListeningContext"
import RemoveListeningContext from "./mutations/removeListeningContext"
import GetStationListeningCount from "./queries/getStationListeningCount"




const resolvers = merge(
                            InsertLhEntry, InsertLikedAudio, 
                            InsertIntoLocationHistory,
                            RemoveLikedAudio, IsAudioLiked, GetLikedAudioByUserId, GetAudioListenCount, GetAudioLikedCount,
                            InsertFollowedStation, RemoveFollowedStation, IsStationFollowed, GetOnlineFollowedStationByUserId, GetFollowedStationCount,
                            SetUserListeningContext, RemoveListeningContext, GetStationListeningCount                   
                        );

export default resolvers;
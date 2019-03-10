import merge from "lodash/merge";

import InsertLhEntry from "./mutations/insertLhEntry"
import InsertLikedAudio from "./mutations/insertLikedAudio"
import RemoveLikedAudio from "./mutations/removeLikedAudio"
import IsAudioLiked from "./queries/isAudioLiked"
import GetLikedAudioByUserId from "./queries/getLikedAudioByUserId"
import GetAudioListenCount from "./queries/getAudioListenCount"
import GetAudioLikedCount from "./queries/getAudioLikedCount"



const resolvers = merge(InsertLhEntry, InsertLikedAudio, RemoveLikedAudio, IsAudioLiked, GetLikedAudioByUserId, GetAudioListenCount, GetAudioLikedCount);

export default resolvers;
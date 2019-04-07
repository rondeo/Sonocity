import merge from "lodash/merge";

import GetRooms from "./queries/getRooms"
import GetMessages from "./queries/getMessages"
import GetUnreadCount from "./queries/getUnreadCount"
import InsertMessage from "./mutations/insertMessage"
import SetSeenTrue from "./mutations/setSeenTrue"

const resolvers = merge(
                            GetRooms, GetMessages, GetUnreadCount, InsertMessage, SetSeenTrue                
                        );

export default resolvers;
import merge from "lodash/merge";

import UserQueries from "./queries/userQueries"
import IsUserOnline from "./queries/isUserOnline"

const resolvers = merge(UserQueries, IsUserOnline);

export default resolvers;
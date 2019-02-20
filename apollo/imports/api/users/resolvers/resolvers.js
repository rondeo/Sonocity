import UserQueries from "./query/userQueries"
import UserMutations from "./mutation/userMutations"
import merge from "lodash/merge";

const resolvers = merge(UserQueries, UserMutations);

export default resolvers;
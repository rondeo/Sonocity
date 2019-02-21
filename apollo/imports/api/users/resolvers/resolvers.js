import UserQueries from "./queries/userQueries"
import UserMutations from "./mutations/userMutations"
import merge from "lodash/merge";

const resolvers = merge(UserQueries);

export default resolvers;
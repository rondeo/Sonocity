import UsersResolvers from "../../api/users/resolvers/resolvers"
import UserSettingsResolvers from "../../api/userSettings/resolvers/resolvers"

import merge from "lodash/merge";

const resolvers = merge(UsersResolvers, UserSettingsResolvers);

export default resolvers;
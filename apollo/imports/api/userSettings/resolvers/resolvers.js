import UserSettingQueries from "./query/userSettingsQueries"
import UserSettingMutations from "./mutation/userSettingsMutations"
import merge from "lodash/merge";

const resolvers = merge(UserSettingQueries, UserSettingMutations);

export default resolvers;
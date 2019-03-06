import UserSettingQueries from "./queries/userSettingsQueries"
// import UserSettingMutations from "./mutations/userSettingsMutations"
import merge from "lodash/merge";

const resolvers = merge(UserSettingQueries /*, UserSettingMutations*/);

export default resolvers;
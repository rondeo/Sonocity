import merge from "lodash/merge";

import CreateStation from "./mutations/createStation"
import Tests from "./queries/tests"

const resolvers = merge(CreateStation, Tests);

export default resolvers;
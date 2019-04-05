import merge from "lodash/merge";

import GetRooms from "./queries/getRooms"





const resolvers = merge(
                            GetRooms                  
                        );

export default resolvers;
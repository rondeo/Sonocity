import Station from '../../collections/station'

export default {
    
    Mutation: {
        updateName(obj, { name }, { user }) {
            const userId=user._id;
            if(userId) {
                const isNameUsed = Station.findOne({name: name});
                if(!isNameUsed) {
                    Station.update(
                        { userId: userId },
                        { $set:
                            {
                              name: name
                            }
                        }
                    );
                    return true;
                }
                return false;     
            }
            throw new Error('Unauthorized');
        }
    }

}

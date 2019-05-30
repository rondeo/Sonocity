import Station from '../../collections/station'

export default {
    
    Mutation: {
        updateDescription(obj, { description }, { user }) {
            const userId=user._id;
            if(userId) {
                Station.update(
                    { userId: userId },
                    { $set:
                        {
                          description: description
                        }
                     }
                );
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}

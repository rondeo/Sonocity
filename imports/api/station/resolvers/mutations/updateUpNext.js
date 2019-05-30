import Station from '../../collections/station'

export default {
    
    Mutation: {
        updateUpNext(obj, { upNext }, { user }) {
            const userId=user._id;
            if(userId) {
                Station.update(
                    { userId: userId },
                    { $set:
                        {
                          upNext: upNext
                        }
                     }
                );
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}

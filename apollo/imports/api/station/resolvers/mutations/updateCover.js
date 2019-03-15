import Station from '../../collections/station'

export default {
    
    Mutation: {
        updateCover(obj, { coverUrl }, { user }) {
            const userId=user._id;
            if(userId) {
                Station.update(
                    { userId: userId },
                    { $set:
                        {
                          coverUrl: coverUrl
                        }
                     }
                );
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}

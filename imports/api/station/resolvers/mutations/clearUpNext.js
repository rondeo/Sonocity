import Station from '../../collections/station'

export default {
    
    Mutation: {
        clearUpNext(obj, arg, { user }) {
            const userId=user._id;
            if(userId) {
                Station.update(
                    { userId: userId },
                    { $set:
                        {
                            upNext: [],
                            status: false
                        }
                     }
                );
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}

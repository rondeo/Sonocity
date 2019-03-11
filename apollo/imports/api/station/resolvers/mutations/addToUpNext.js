import Station from '../../collections/station'

export default {
    
    Mutation: {
        addToUpNext(obj, { audioId }, { user }) {
            const userId=user._id;
            if(userId) {
                Station.update(
                    { userId: userId },
                    { $push: 
                        { 
                            upNext: audioId 
                        }, 
                      $set: 
                      {
                            status: true
                      }
                    }
                );
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}

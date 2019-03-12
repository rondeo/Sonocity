import Station from '../../collections/station'

export default {
    
    Mutation: {
        updateName(obj, { name }, { user }) {
            const userId=user._id;
            if(userId) {

                async function isNameUsed() {
                    const isNameUsed = Station.findOne({name: name});
                    return isNameUsed;
                }

                async function runMutation() {
                    const isNameUsed = await isNameUsed();
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

                runMutation();

            }
            throw new Error('Unauthorized');
        }
    }

}

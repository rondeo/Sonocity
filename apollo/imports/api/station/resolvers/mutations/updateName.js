import Station from '../../collections/station'

export default {
    
    Mutation: {
        updateName(obj, { name }, { user }) {
            const userId=user._id;
            if(userId) {

                async function isNameUsed() {
                    try {
                        const is = Station.findOne({name: name});
                        return is;
                    } catch (e) {
                        console.log(e)
                    }
                }

                async function runMutation() {
                    try {
                        const is = await isNameUsed();
                        if(!is) {
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
                    } catch (e) {
                        console.log(e)
                    }
                    return false;     
                }

                return runMutation();

            }
            throw new Error('Unauthorized');
        }
    }

}

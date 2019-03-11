import Station from '../../collections/station'

export default {
    
    Mutation: {
        createStation(obj, arg, { user }) {
            const userId=user._id;
            if(userId) {
                const stationId = Station.insert({
                    userId: userId,
                    name: userId,
                    confidentialitySetting: 1,
                    description: "Add a short bio to tell people more about yourself."
                });
                return Station.findOne(stationId);
            }
            throw new Error('Unauthorized');
        }
    }

}

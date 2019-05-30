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
                    description: "Add a short bio to tell people more about yourself.",
                    coverUrl: "https://res.cloudinary.com/dkt7hv91e/image/upload/v1552662276/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                });
                return Station.findOne(stationId);
            }
            throw new Error('Unauthorized');
        }
    }

}

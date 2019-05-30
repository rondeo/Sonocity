
export default {
    Query : {
        user(obj, arg, { user } ) {
            return user || {};
        }
    },
    User: {
        email: user => user.emails[0].address      
    }
};
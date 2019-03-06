
export default {
    Query : {
        audioData(obj, arg, { user } ) {
            return user || {};
        }
    }
};
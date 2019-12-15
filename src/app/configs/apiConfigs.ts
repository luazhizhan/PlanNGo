const API_URL = 'https://elp-planngo.herokuapp.com/';

const apisConfigs = {
    get: {
        getTravelPlanByUserID: API_URL + 'get-travel-plan-by-userid/',
    },
    post: {
        login: API_URL + 'login',
        createTravelPlan: API_URL + 'create-travel-plan'
    },
    put: {
        updateTravelPlanByTravelPlanID: API_URL + 'update-travel-plan-by-travel-plan-id',
    },
    delete: {
        deleteTravelPlanByIDs: API_URL + 'delete-travel-plan-by-ids'
    }
};

export default apisConfigs;

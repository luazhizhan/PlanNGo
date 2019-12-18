const API_URL = 'https://elp-planngo.herokuapp.com/';

const apisConfigs = {
    get: {
        getTravelPlanByUserID: API_URL + 'get-travel-plan-by-userid/',
        getTravelPlanByPlanCollabUserID: API_URL + 'get-travel-plan-by-plan-collab-userid/',
        getPlanCollabByTravelPlanID: API_URL + 'get-plan-collab-by-travelplanid/'
    },
    post: {
        login: API_URL + 'login',
        createTravelPlan: API_URL + 'create-travel-plan',
        addPlanCollab: API_URL + 'add-plan-collab'
    },
    put: {
        updateTravelPlanByTravelPlanID: API_URL + 'update-travel-plan-by-travel-plan-id',
    },
    delete: {
        deleteTravelPlanByIDs: API_URL + 'delete-travel-plan-by-ids',
        removePlanCollabByIds: API_URL + 'remove-plan-collab-by-ids'
    }
};

export default apisConfigs;

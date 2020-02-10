const API_URL = 'https://elp-planngo.herokuapp.com/';
// const API_URL = 'http://localhost:3000/';

const apisConfigs = {
  get: {
    getUserByUsernameOrEmail: API_URL + 'get-user-by-username-or-email/',
    getTravelPlanByUserID: API_URL + 'get-travel-plan-by-userid/',
    getTravelPlanByPlanCollabUserID: API_URL + 'get-travel-plan-by-plan-collab-userid/',
    getPlanCollabByTravelPlanID: API_URL + 'get-plan-collab-by-travelplanid/',
    getPlanCollabUserDetailByTravelPlanID: API_URL + 'get-plan-collab-user-detail-by-travelplanid/',
    getWishList: API_URL + 'get-wish-list/',
    getWishListByID: API_URL + 'get-wish-list/'
  },
  post: {
    login: API_URL + 'login',
    createTravelPlan: API_URL + 'create-travel-plan',
    addPlanCollab: API_URL + 'add-plan-collab',
    createTravelJournal: API_URL + 'create-travel-journal',
    createWishList: API_URL + 'create-wish-list'
  },
  put: {
    updateTravelPlanByTravelPlanID: API_URL + 'update-travel-plan-by-travel-plan-id',
    updateWishList: API_URL + 'update-wish-list'
  },
  delete: {
    deleteTravelPlanByIDs: API_URL + 'delete-travel-plan-by-ids',
    removePlanCollabByIds: API_URL + 'remove-plan-collab-by-ids',
    deleteWishList: API_URL + 'delete-wish-list'
  }
};

export default apisConfigs;

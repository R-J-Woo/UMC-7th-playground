import { responseFromStore, responseFromReview, responseFromMissionToStore, responseFromMissionToChallenge } from "../dtos/store.dto.js";
import {
  addStoreModel,
  getStoreModel,
  addReviewModel,
  getReviewListModel,
  addMissionToStoreModel,
  getMissionToStoreModel,
  addMissionToChallengeModel,
  getMissionToChallengeModel
} from "../repositories/store.repository.js";


export const addStoreService = async(data) => {
  const addStoreId = await addStoreModel({
    region_id: data.region_id,
    name: data.name,
    address: data.address,
    score: data.score
  });

  const store = await getStoreModel(addStoreId);

  return responseFromStore(store);
}

export const getReviewListService = async (storeId, cursor) => {
  const reviews = await getReviewListModel(storeId, cursor);
  return responseFromReview(reviews)
}

export const addReviewService = async(data) => {
  const addReviewId = await addReviewModel({
    user_id: data.user_id,
    store_id: data.store_id,
    body: data.body,
    score: data.score
  });

  const review = await getReviewModel(addReviewId);
  
  return responseFromReview(review);
}

export const addMissionToStoreService = async (data) => {
    const addMissionToStoreId = await addMissionToStoreModel({
        store_id: data.store_id,
        reward: data.reward,
        deadline: data.deadline,
        mission_spec: data.mission_spec
    })

    const mission = await getMissionToStoreModel(addMissionToStoreId);
    return responseFromMissionToStore(mission);
}

export const addMissionToChallengeService = async (data) => {
    const addMissionToChallengeId = await addMissionToChallengeModel({
        user_id: data.user_id,
        mission_id: data.mission_id,
        status: data.status
    })
    
    if (addMissionToChallengeId === null) {
        throw new Error("이미 도전 중인 미션입니다.");
    }

    const challenge = await getMissionToChallengeModel(addMissionToChallengeId);
    return responseFromMissionToChallenge(challenge);
}
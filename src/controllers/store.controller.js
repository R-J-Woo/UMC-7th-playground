import { StatusCodes } from "http-status-codes";
import { bodyToStore, bodyToReview, bodyToMissionToStore, bodyToMissionToChallenge } from "../dtos/store.dto.js";
import { addStoreService, addReviewService, addMissionToStoreService, addMissionToChallengeService } from "../services/store.service.js";


// 특정 지역에 가게 추가
export const AddStoreController = async (req, res, next) => {
    const region_id = req.params.region_id;
  
    const store = await addStoreService(bodyToStore(region_id, req.body));
    res.status(StatusCodes.OK).json({result: store});
}
  
// 가게에 리뷰 추가
export const AddReviewController = async (req, res, next) => {
  const store_id = req.params.store_id;

  const review = await addReviewService(bodyToReview(store_id, req.body));
  res.status(StatusCodes.OK).json({result: review});
}

// 가게에 미션 추가
export const AddMissionToStoreController = async (req, res, next) => {
  const store_id = req.params.store_id;

  const mission = await addMissionToStoreService(bodyToMissionToStore(store_id, req.body));
  res.status(StatusCodes.OK).json({result: mission});
  
}

// 가게의 미션을 도전 중인 미션에 추가
export const AddMissionToChallengesController = async (req, res, next) => {
  const mission_id = req.params.mission_id;

  const challenge = await addMissionToChallengeService(bodyToMissionToChallenge(mission_id, req.body));
  res.status(StatusCodes.OK).json({result: challenge});

}
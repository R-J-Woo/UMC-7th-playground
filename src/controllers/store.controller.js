import { StatusCodes } from "http-status-codes";
import { bodyToStore, bodyToReview, bodyToMissionToStore, bodyToMissionToChallenge } from "../dtos/store.dto.js";
import { addStoreService, addReviewService, addMissionToStoreService, addMissionToChallengeService,
  getReviewListService, getMyReviewListService, getMyChallengesService, updateChallengeToCompleteService,
  getStoreMissionListService
 } from "../services/store.service.js";


// 특정 지역에 가게 추가
export const AddStoreController = async (req, res, next) => {
    const region_id = req.params.region_id;
  
    const store = await addStoreService(bodyToStore(region_id, req.body));
    res.status(StatusCodes.OK).json({result: store});
}

// 가게 리뷰 조회
export const getReviewListController = async (req, res, next) => {
    const reviews = await getReviewListService(
      parseInt(req.params.store_id),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
    res.status(StatusCodes.OK).json(reviews);
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

// 내가 작성한 리뷰 목록 가져오기
export const getMyReviewListController = async (req, res, next) => {

  const myReviews = await getMyReviewListService(
    parseInt(req.params.store_id),
    parseInt(req.body.user_id),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);

  res.status(StatusCodes.OK).json(myReviews);
}

// 특정 가게의 미션 목록 가져오기
export const getStoreMissionListController = async (req, res, next) => {
  const storeMissionList = await getStoreMissionListService(
    parseInt(req.params.store_id),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  )

  res.status(StatusCodes.OK).json(storeMissionList);
}

// 내가 진행 중인 미션 목록 가져오기
export const getMyChallengesContoller = async (req, res, next) => {
  const myChallenges = await getMyChallengesService(
    parseInt(req.body.user_id),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);

  res.status(StatusCodes.OK).json(myChallenges);
}

// 내가 진행 중인 미션 목록을 진행 완료로 바꾸기
export const updateChallengeToCompleteContoller = async (req, res, next) => {
  const userMissionId = parseInt(req.params.user_mission_id);
  const completeChallenge = await updateChallengeToCompleteService(userMissionId);

  res.status(StatusCodes.OK).json(completeChallenge);
}
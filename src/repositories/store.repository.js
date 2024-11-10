import { pool, prisma } from "../db.config.js";

// 특정 지역에 가게 추가
export const addStoreModel = async(data) => {
  const store = await prisma.store.create({
    data: {
      regionId: parseInt(data.region_id),
      name: data.name,
      address: data.address,
      score: data.score
    }
  });

  return store.id;
}

// 가게 정보 얻기
export const getStoreModel = async (storeId) => {
  const store = await prisma.store.findUnique({
    select: {
      id: true,
      region: true,
      name: true,
      address: true,
      score: true
    },
    where: {id: parseInt(storeId)}
  });

  return store;
};

// 가게 리뷰 리스트 가져오기
export const getReviewListModel = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      store: true,
      user: true
    },
    where: {storeId: storeId, id: {gt: cursor}},
    orderBy: {id: "asc"},
    take: 5
  });

  return reviews;
}

// 리뷰 추가하기
export const addReviewModel = async(data) => {
  const review = await prisma.review.create({
    data: {
      userId: parseInt(data.user_id),
      storeId: parseInt(data.store_id),
      body: data.body,
      score: data.score
    }
  });

  return review.id;
}

// 가게 리뷰 가져오기
export const getReviewModel = async (reviewId) => {
  const review = await prisma.review.findUnique({
    select: {
      id: true,
      user: true,
      store: true,
      body: true,
      score: true
    },
    where: {id: parseInt(reviewId)}
  });

  return review;
}

// 가게에 미션 추가하기
export const addMissionToStoreModel = async (data) => {
  const mission = await prisma.mission.create({
    data: {
      storeId: parseInt(data.store_id),
      reward: data.reward,
      deadline: data.deadline,
      missionSpec: data.mission_spec
    }
  });

  return mission.id;
}

// 가게의 미션 정보 얻기
export const getMissionToStoreModel = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    select: {
      id: true,
      store: true,
      reward: true,
      deadline: true,
      missionSpec: true
    },
    where: {id: parseInt(missionId)}
  });

  return mission;
};

// 도전 중인 미션 추가
export const addMissionToChallengeModel = async (data) => {
  const challenge = await prisma.userMission.create({
    data: {
      missionId: parseInt(data.mission_id),
      userId: parseInt(data.user_id),
      status: data.status
    }
  });

  return challenge.id;
}

// 도전 미션 정보 가져오기
export const getMissionToChallengeModel = async (challengeId) => {
  const challenge = await prisma.userMission.findUnique({
    select: {
      id: true,
      user: true,
      mission: true,
      status: true
    },
    where: {id: parseInt(challengeId)}
  });

  return challenge;
}
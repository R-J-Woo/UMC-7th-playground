  
  export const bodyToStore = (region_id, body) => {
    return {
      region_id: region_id,
      name: body.name,
      address: body.address,
      score: 0 // 가게 생성될 때는 default 값 0으로 시작
    }
  }
  
  export const responseFromStore = (data) => {
    return {
      store: data
    }
  }
  
  export const bodyToReview = (store_id, body) => {
    return {
      user_id: body.user_id,
      store_id: store_id,
      body: body.body,
      score: body.score
    }
  }
  
  export const responseFromReview = (data) => {
    return {
      review: data
    }
  }

  export const bodyToMissionToStore = (store_id, body) => {
    return {
        store_id: store_id,
        reward: body.reward,
        deadline: body.deadline,
        mission_spec: body.mission_spec
    }
  }
  
  export const responseFromMissionToStore = (data) => {
    return {
        mission: data
    }
  }

  export const bodyToMissionToChallenge = (mission_id, body) => {
    return {
        mission_id: mission_id,
        user_id: body.user_id,
        status: "진행 중"
    }
  }

  export const responseFromMissionToChallenge = (data) => {
    return {
        challenge: data
    }
  }
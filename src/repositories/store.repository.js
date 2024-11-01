import { pool } from "../db.config.js";

// 특정 지역에 가게 추가
export const addStoreModel = async(data) => {
  const conn = await pool.getConnection();

  try {
    
    const [result] = await pool.query(
      `INSERT INTO store (region_id, name, address, score) VALUES (?, ?, ?, ?);`,
      [data.region_id, data.name, data.address, data.score]
    );

    return result.insertId;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    )
  }
}

// 가게 정보 얻기
export const getStoreModel = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, storeId);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 리뷰 추가하기
export const addReviewModel = async(data) => {
  const conn = await pool.getConnection();

  try {
    
    const [result] = await pool.query(
      `INSERT INTO review (user_id, store_id, body, score) VALUES (?, ?, ?, ?);`,
      [data.user_id, data.store_id, data.body, data.score]
    );

    return result.insertId;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    )
  }
}

// 리뷰 정보 얻기
export const getReviewModel = async (reviewId) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, reviewId);

    if (review.length == 0) {
      return null;
    }

    return review;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 가게에 미션 추가하기
export const addMissionToStoreModel = async (data) => {
    
  const conn = await pool.getConnection();

  try {
    
    const [result] = await pool.query(
      `INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?);`,
      [data.store_id, data.reward, data.deadline, data.mission_spec]
    );

    return result.insertId;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    )
  }
}

// 가게의 미션 정보 얻기
export const getMissionToStoreModel = async (missionId) => {
    const conn = await pool.getConnection();
  
    try {
      const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, missionId);
  
      if (mission.length == 0) {
        return null;
      }
  
      return mission;
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
};

// 도전 중인 미션 추가
export const addMissionToChallengeModel = async (data) => {
    
    const conn = await pool.getConnection();
  
    try {
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM user_mission WHERE user_id = ? and mission_id = ?) as isExistChallenge;`,
            [data.user_id, data.mission_id]
        );
  
        if (confirm[0].isExistChallenge) {
            return null;
        }
      
        const [result] = await pool.query(
            `INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, ?);`,
            [data.user_id, data.mission_id, data.status]
        );
  
        return result.insertId;
  
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      )
    }
}

// 도전 미션 정보 가져오기
export const getMissionToChallengeModel = async (challengeId) => {
    const conn = await pool.getConnection();
  
    try {
      const [challenge] = await pool.query(`SELECT * FROM user_mission WHERE id = ?;`, challengeId);
  
      if (challenge.length == 0) {
        return null;
      }
  
      return challenge;
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
}
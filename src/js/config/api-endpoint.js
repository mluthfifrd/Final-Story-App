import Config from './config'

const ApiEndpoint = {
  REGISTER: `${Config.BASE_URL}/register`,
  LOGIN: `${Config.BASE_URL}/login`,

  GET_ALL_STORIES: `${Config.BASE_URL}/stories`,
  GET_BY_ID_STORIES: (id) => `${Config.BASE_URL}/stories/${id}`,
  CREATE_NEW_STORIES: `${Config.BASE_URL}/stories`
}

export default ApiEndpoint

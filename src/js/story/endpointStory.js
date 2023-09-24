import axios from 'axios'
import Config from '../config/config'
import Utils from '../utils/utils'
import ApiEndpoint from '../config/api-endpoint'

const EndpointStory = {
  async getAll() {
    return await axios.get(ApiEndpoint.GET_ALL_STORIES, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`
      }
    })
  },

  async getDetail() {
    return await axios.get(ApiEndpoint.GET_BY_ID_STORIES, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`
      }
    })
  },

  async createNewStory({ photo, description }) {
    return await axios.post(
      ApiEndpoint.CREATE_NEW_STORIES,
      { photo, description },
      {
        headers: {
          Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
}

export default EndpointStory

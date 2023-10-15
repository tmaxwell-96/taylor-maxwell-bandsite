//Global Variables
//-------------------------------------------

const apiKey = "f44a8d71-9c00-4cd3-b3d0-67f611a6155c";
const URL = "https://project-1-api.herokuapp.com/";

//Create a Class
//-------------------------------------------

class BandSiteAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://project-1-api.herokuapp.com/";
  }
  async postComment(newComment) {
    const response = await axios.post(
      `${this.baseURL}comments?api_key=${apiKey}`,
      newComment
    );
  }

  async getComments() {
    let response = await axios.get(`${this.baseURL}comments?api_key=${apiKey}`);
    response.data.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    return response.data;
  }

  async getShows() {
    let showInfo = await axios.get(
      `${this.baseURL}showdates?api_key=${apiKey}`
    );
    return showInfo.data;
  }

  async commentLike(commentId) {
    let response = await axios.put(
      `${this.baseURL}comments/${commentId}/like?api_key=${apiKey}`
    );
  }

  async commentDelete(commentId) {
    let response = await axios.delete(
      `${this.baseURL}comments/${commentId}?api_key=${apiKey}`
    );
  }
}

export default BandSiteAPI;

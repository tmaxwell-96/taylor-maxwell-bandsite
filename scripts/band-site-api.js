const apiKey = "f44a8d71-9c00-4cd3-b3d0-67f611a6155c";
const URL = "https://project-1-api.herokuapp.com/";

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
}

export default BandSiteAPI;

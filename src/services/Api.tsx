import axios from "axios";

const techno_calling_admin = JSON.parse(
  localStorage.getItem("techno_calling_admin") || "{}"
);

const api = axios.create({
  baseURL: "https://popularizers.in/dev/api/api/",
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer abcdef",
  },
});
const apiGet = axios.create({
  baseURL: "https://popularizers.in/dev/api/api/",
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer abcdef",
    access_key: `${techno_calling_admin.access_key}`,
  },
});
const apiFile = axios.create({
  baseURL: "https://popularizers.in/dev/api/api/",
  headers: {
    Authorization: "Bearer abcdef",
    ContentType: "multipart/form-data",
    access_key: `${techno_calling_admin.access_key}`,
  },
});

export class API {
  static getUrl(url: any) {
    return api({
      method: "GET",
      url: url,
    });
  }
  static common_api(api_name: any, opost: any) {
    return api({
      method: "POST",
      url: api_name,
      data: opost,
    });
  }
  static getUData(url: any) {
    return apiGet({
      method: "GET",
      url: url,
    });
  }
  static postData(api_name: any, opost: any) {
    return apiGet({
      method: "POST",
      url: api_name,
      data: opost,
    });
  }
  static uploadFile(api_name: any, opost: any) {
    return apiFile({
      method: "POST",
      url: api_name,
      data: opost,
    });
  }
}

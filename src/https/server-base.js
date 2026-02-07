import axios from "axios";

/* ================= BASE URL ================= */

export const appUrl = "https://fileupload.friensys.com/api";

export const assetsUrl = "https://fileupload.friensys.com/api/GetFile";
export const chatUrl = process.env.REACT_APP_SOCKET_URL;

export const getImgUrl = "https://fileupload.friensys.com/img/";
export const getImgUrlWithoutImg = "https://fileupload.friensys.com/";

export const baseUrl = appUrl;

/* ================= AXIOS INSTANCE ================= */

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
  },
});

/* ================= COMMON API FUNCTION ================= */

export const baseFunc = (endURL) => {
  return (method, options = {}) => {
    const params = options.params ? `/${options.params}` : "";

    let url = `/${endURL}${params}`;

    if (options.postfix) {
      url += options.postfix;
    }

    const headers = {
      "Content-Type":
        options.data instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    };

    switch (method.toLowerCase()) {
      case "get":
        return api.get(url, { headers });

      case "post":
        return api.post(url, options.data, { headers });

      case "put":
        return api.put(url, options.data, { headers });

      case "delete":
        return api.delete(url, {
          headers,
          data: options.data || { deleted: 1 },
        });

      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  };
};

import { instance } from "../service/service";

// https://learnwitheunjae.dev/api/sinabro-js/ecommerce
const PRODUCT_URL = "https://learnwitheunjae.dev/api/sinabro-js/ecommerce";

export const getProdcuts = async () => {
  try {
    const data = await instance
      .get(PRODUCT_URL, {
        cancelPreviousRequests: true,
      })
      .then((res) => {
        return res.data;
      });

    return data;
  } catch (err) {
    console.error(err);
  }
};

import sha1 from 'sha1';
import _ from 'lodash';

const secret = '_ujL-pUC-Jw-aHbHzgEBRKA8xu4';
const apiKey = '433828571112967';
const cloudName = 'crash-assist';

const getSignature = (params) => {
  const parsed = Object.keys(params).map((i) => i+'='+params[i]).join('&');
  const signature = parsed + secret;
  return sha1(signature);
};

const cloudinaryConfig = {
    imageUploadUri: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    getSignature,
    getRequestParams({uri, name}) {
      const now = + Date.now();
      const data = new FormData();
      const params = {
        timestamp: now,
        // public_id: public_id,
      };
      params.signature = getSignature(params);
      params.api_key =  apiKey;
      data.append('file', {type: "image/jpeg", uri: uri, name: name });
      _.each(params, (value, key) => data.append(key, String(value)));
      return data;
    }
};

export default cloudinaryConfig;

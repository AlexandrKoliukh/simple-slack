import axios from 'axios';
import routes from './routes';

const dataConstructor = (attributes) => ({
  data: {
    attributes,
  },
});

export const getMessages = (channelId) => axios.get(routes.channelMessagesPath(channelId));

export const postMessage = (channelId, attributes) => {
  const data = dataConstructor({ ...attributes });
  return axios.post(routes.channelMessagesPath(channelId), data);
};

export const getChannels = () => axios.get(routes.channelsPath());

export const removeChannel = (channelId) => axios.delete(routes.channelPath(channelId));

export const patchChannel = (channelId, name) => {
  const data = dataConstructor({ name });
  return axios.patch(routes.channelPath(channelId), data);
};

export const createChannel = (name) => {
  const data = dataConstructor({ name });
  return axios.post(routes.channelsPath(), data);
};

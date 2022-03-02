/* eslint no-undef: 0 */
const http = async <P>(path: string, config: RequestInit): Promise<P> => {
  const request = new Request(path, config);
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error('Could not load info');
  }
  return response.json().catch(() => {
    throw new Error('Error while getting response');
  });
};

const get = async <P>(path: string, config?: RequestInit): Promise<P> => {
  const init = { method: 'get', ...config };
  return http<P>(path, init);
};

const post = async <B, P>(path: string, body: B, config?: RequestInit): Promise<P> => {
  const init = { method: 'post', body: JSON.stringify(body), ...config };
  return http<P>(path, init);
};

const put = async <B, P>(path: string, body: B, config?: RequestInit): Promise<P> => {
  const init = { method: 'put', body: JSON.stringify(body), ...config };
  return http<P>(path, init);
};

export { get, post, put };

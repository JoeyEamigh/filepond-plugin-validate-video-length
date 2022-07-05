import getBlobDuration from 'get-blob-duration';

const plugin = ({ addFilter, utils }) => {
  // get quick reference to Type utils
  const { Type } = utils;

  function isValid(duration, min, max) {
    return duration >= min && duration <= max;
  }

  // called for each file that is loaded
  // right before it is set to the item state
  // should return a promise
  addFilter(
    'LOAD_FILE',
    (file, { query }) =>
      new Promise(async (resolve, reject) => {
        if (!query('GET_ALLOW_VIDEO_LENGTH_VALIDATION')) {
          resolve(file);
          return;
        }

        const duration = await getBlobDuration(file);

        const minLength = query('GET_MIN_VIDEO_LENGTH') || 0;
        const maxLength = query('GET_MAX_VIDEO_LENGTH') || 9e15;
        const isValidLength = isValid(duration, minLength, maxLength);

        const handleRejection = () => {
          reject({
            status: {
              main: 'Video length not allowed',
              sub: getVideoLengthText(),
            },
          });
        };

        const getVideoLengthText = () => {
          if (minLength && maxLength)
            return `Make sure the video's length is between ${minLength} and ${maxLength} seconds.`;
          if (minLength) return `Make sure the video's length is at least ${minLength} seconds.`;
          if (maxLength) return `Make sure the video's length is at most ${maxLength} seconds.`;
          return '';
        };

        // has returned new filename immediately
        if (typeof isValidLength === 'boolean') {
          if (!isValidLength) {
            return handleRejection();
          }
          return resolve(file);
        }

        return resolve(file);
      }),
  );

  // expose plugin
  return {
    options: {
      allowVideoLengthValidation: [false, Type.BOOLEAN],
      maxVideoLength: [0, Type.NUMBER],
      minVideoLength: [0, Type.NUMBER],
    },
  };
};

// fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
if (isBrowser) {
  document.dispatchEvent(new CustomEvent('FilePond:pluginloaded', { detail: plugin }));
}

export default plugin;

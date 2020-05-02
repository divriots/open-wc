/* eslint-disable import/no-extraneous-dependencies */
const { mdjsProcess } = require('@mdjs/core');

function eleventyUnified(options) {
  return {
    set: () => {},
    render: async str => {
      const result = await mdjsProcess(str, {
        htmlHeadingOptions: {
          properties: {
            className: ['header-anchor'],
          },
          content: [{ type: 'text', value: '#' }],
        },
        ...options,
      });
      return result;
    },
  };
}

const defaultEleventyUnifiedOptions = {
  plugins: [],
};

const _eleventy = {
  initArguments: {},
  configFunction: (eleventyConfig, pluginOptions = {}) => {
    const options = {
      ...defaultEleventyUnifiedOptions,
      ...pluginOptions,
    };
    eleventyConfig.setLibrary('md', eleventyUnified(options));
  },
};

module.exports = _eleventy;

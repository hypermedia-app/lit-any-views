/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')
const bsSettings = require('@open-wc/testing-karma-bs/bs-settings.js')
const createBaseConfig = require('./karma.conf.js')

module.exports = config => {
  config.set(
    merge(bsSettings(config), createBaseConfig(config), {
      browserStack: {
        project: '@lit-any/views',
      },
    }),
  )

  // eslint-disable-next-line no-param-reassign
  config.concurrency = 1
  config.browsers.splice(config.browsers.indexOf('bs_win10_ie_11'), 1)

  return config
}

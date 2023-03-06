/* eslint-disable no-undef */
// module.exports = {
//   webpack(config) {
//     config.module.rules.push({
//       loader: '@svgr/webpack',
//       issuer: /\.[jt]sx?$/,
//       options: {
//         svgo: true,
//         svgoConfig: {
//           plugins: [
//             {
//               name: 'preset-default',
//               params: { override: { removeViewBox: false } },
//             },
//           ],
//         },
//         titleProp: true,
//       },
//       test: /\.svg$/,
//     });
//     return config;
//   },
// };

module.exports = {
  // other configs...

  // future: { webpack5: true }, // -- not needed since Next.js v11.0.0
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                },
              ],
            },

            titleProp: true,
          },
        },
      ],
    });
    return config;
  },
};

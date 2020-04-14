'use strict';

module.exports = function (/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: "Letterman",
    short_name: "Letterman",
    description: "Digital Document Manager",
    start_url: "/",
    display: "standalone",
    background_color: "#0D0E8B",
    theme_color: "#0D0E8B",
    icons: [
      {
        src: "/letterman_logo.png",
        sizes: "540x540",
        type: "image/png"
      }
    ],
    ms: {
      tileColor: '#0D0E8B'
    }
  };
}
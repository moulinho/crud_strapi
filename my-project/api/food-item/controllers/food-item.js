"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  postItems: async (ctx) => {
    console.log("ctx", ctx);

    ctx.send({
      message: "food Poster",
    });
    //$$ const id = ctx.params.id;
    // const { id } = ctx.params;
    // return id;
  },
};

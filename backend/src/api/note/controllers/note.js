'use strict';

/**
 *  note controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::note.note', ({strapi}) => ({
  async create(ctx) {
    const User = ctx.state.user.id
    ctx.request.body.data.User = User
    const i = await super.create(ctx)   
    return i
  },
  async find(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.response.unauthorized([], [], []);
    }
    ctx.query = {
      ...ctx.query, filters: {
        User: user.id,
      }, sort : ['createdAt:desc']
    }

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now()

    return { data, meta };

  },
  async findOne(ctx) {
    // some logic here
    const i = await strapi.db.query("api::note.note").findOne({ where: { id: ctx.params.id, User: ctx.state.user.id } });

    if (!i) ctx.response.unauthorized([], [], [])

    return i;
  }
}));

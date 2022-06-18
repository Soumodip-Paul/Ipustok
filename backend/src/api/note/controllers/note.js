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

    const data = await strapi.db.query('api::note.note').findMany({where: {User : user.id}});  

    if(!data){
      return ctx.notFound();
    }

    ctx.send(data);
  },
    async findOne(ctx) {
        // some logic here
        const i = await strapi.db.query("api::note.note").findOne({where: {id: ctx.params.id,User:ctx.state.user.id}});

        if ( !i ) ctx.response.unauthorized([], [], [])

        return i;
      }
}));

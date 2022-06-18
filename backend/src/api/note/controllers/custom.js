const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::note.note', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    console.table(ctx.request.body)
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
},

  // Method 2: Wrapping a core action (leaves core logic in place)
  async find(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
    }

    const data = await strapi.db.query('api::note.note').findMany({where: {User : user.id}});  

    if(!data){
      return ctx.notFound();
    }

    ctx.send(data);
  },

}));
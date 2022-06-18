module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/notes/custom',
      handler: 'custom.exampleAction',
    }, {
      method: "GET",
      path: "/notes/me",
      handler: "custom.find",
      config: {
        "policies": []
      }
    }
  ],
};
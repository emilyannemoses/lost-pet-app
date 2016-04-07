function index(req, res) {
  res.json({
    message: "Welcome to Pet Spotter!",
    documentation_url: "https://github.com/eamoses/project-01/blob/master/README.md",
    base_url: "http://protected-sea-74069.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;

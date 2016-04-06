// Update your database connection to point to Heroku's database
mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL ||
                      "YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE" );

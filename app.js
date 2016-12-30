/* globals require  */

const config = require('./config'),
    app = require('./config/application'),
    data = require('./data')(config),
    passport = require('passport'),
    controllers = require('./controllers')({ data, config });

// multer = require('multer'),
// uploadUserImage = multer({ dest: './public/imgs/user-images/' }),
// uploadCompetitionImage = multer({ dest: './public/imgs/competition-images/' }),
// uploadCategoryImage = multer({ dest: './public/imgs/categories-images/' });

//require('./server/config/passport')(app, data);
//require('./routers')({ app, data, uploadUserImage, uploadCompetitionImage, uploadCategoryImage });
require('./routers')({ app, controllers, config });

app.listen(config.port);

console.log(`Server is running on port: ${config.port}`);
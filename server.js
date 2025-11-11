const dotenv = require('dotenv');
dotenv.config();
const app = require('./src/app');
const { init } = require('./src/db/postgres');

const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await init();
  } catch (e) {
    console.error(e);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();


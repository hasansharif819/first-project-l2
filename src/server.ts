import app from './app';
import config from './config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    //npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
    //npx eslint --init
    console.log(error);
  }
}

main();

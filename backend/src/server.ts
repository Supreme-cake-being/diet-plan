import app from './app';

const { PORT } = process.env;

app.listen(PORT, () =>
  console.log(`Server running. Use our API on port: ${PORT}`)
);

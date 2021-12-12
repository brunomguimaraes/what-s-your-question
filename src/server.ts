import './setup';
import app from './app';

let port: string = process.env.PORT;

if (process.env.NODE_ENV === 'dev') {
  port = '4000';
}

app.listen(port);

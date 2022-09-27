DROP DATABASE IF EXISTS calendar_app;
DROP DATABASE IF EXISTS calendar_app_test;
CREATE DATABASE calendar_app;
CREATE DATABASE calendar_app_test;

\c calendar_app;

CREATE TABLE users (
  username VARCHAR PRIMARY KEY,
  given_name VARCHAR NOT NULL,
  pass_word VARCHAR NOT NUll
);

CREATE TABLE events (
  event_id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  day VARCHAR NOT NULL,
  tod VARCHAR NOT NULL,
  descrip INT NOT NULL,
  user_name VARCHAR NOT NULL REFERENCES users(username)
);

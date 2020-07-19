# Alias Online

Backend for Alias Online App

## Deploy

### Using docker-compose

``` $ sudo docker-compose up --build -d```

### Manually

1. Create necessary environment:
    - WORDS_FILE
    - DB_USER
    - DB_DB
    - DB_PASS
    - DB_HOST
    - DB_DIALECT
    
2. Create a database for application 
(PostgreSQL is preferable)

3. Build an app itself:

``` $ node app/build/www ```

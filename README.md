# yaraku_books
Book list assignment

For now, the actual project is under books/
composer is installed at bin/composer
laravel is installed at vendor/bin/laravel

run any laravel commands with vendor/bin/laravel
## Required
php 7.2 
Composer 1.9.3 


### composer install
https://getcomposer.org/doc/00-intro.md
### laravel install
https://laravel.com/docs/5.8/installation

bin/composer require laravel/installer
vendor/bin/laravel new blog

**OR**

bin/composer create-project --prefer-dist laravel/laravel project_name "5.8.*"

### Setup with react
https://blog.pusher.com/react-laravel-application/

## Docker
build 
docker build -t tag .

when server is exposed and ready
$ docker run -p 8181:8181 my-first-image

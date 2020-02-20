# Notes

## Commands

### php artisan
php artisan make:model {Model} -m
  - -m specifies to create migration

php artisan migrate

php artisan make:controller ModelController

php artisan make:seeder UsersTableSeeder

php artisan db:seed --class=UsersTableSeeder
  - --class is optional

php artisan serve --host=localhost --port=8181

### npm 

**hot-reloading**
npm run hot



### Docker
docker build -t {my_image} .
docker image ls
docker run {my_image}
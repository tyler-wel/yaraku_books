# Great Book List (Laravel + React App)

![Heroku](https://heroku-badge.herokuapp.com/?app=pure-river-32168)

Visit the site [here](https://pure-river-32168.herokuapp.com/)!


## About 
This is a simple book list app using Laravel backend and React frontend. 
The project was originally built using WSL, but should be buildable on any UNIX platform.

## Development Prerequisites
- php 7.2
- composer 1.9.x
- laravel 3.0.x
- nodejs 8.10.x
- npm 3.5.x

## Build
Please make sure you have the above prerequisites installed before moving forward. For more info on setting up a local development environment, please see the link(s) below.
- [Composer 1.9.3 Setup](https://getcomposer.org/download/)
- [Laravel 6.x Setup](https://laravel.com/docs/6.x)
- [Setting up Laravel in WSL]()

First clone the repository
```
git clone https://github.com/tyler-wel/yaraku_books.git
```

After cloning, please run the following commands
```
composer install
npm install
```

Duplicate the `.env.example` and rename it to `.env`. 
After duplicating, run the follow command and copy it into `APP_KEY` in your new `.env`
```
php artisan key:generate
```

Please run the following command to run the migrations (with optional faker seed)
```
php artisan migrate
php artisan migrate --seed
```

And finally, run the following command to get the frontend built
```
npm run dev
```

If all has gone well, you can start the server with
```
php artisan serve --port==8181
```

## License
This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

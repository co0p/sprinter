Sprinter
=========

A little (angular) website helping a scrum master to get an
understanding of the available time to plan a sprint.

run the app with
>  grunt serve


The server is a little php script serving and saving the db.
>  cd server; php -S 127.0.0.1:8080

The database is a simple json object of members:
>  [
>    {name: 'peter', team:'dev', days:4, drag:0.6},
>    {...},
>      ...
>  ]

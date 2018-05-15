# PicApp Server Management Web App

This app allows a PicApp superuser to manage all aspects of the application. From adding, modifying and
deleting servers and/or users to check app's statistics from [Firebase](https://firebase.google.com).

## Running app
To run the app, you need to have installed [npm](https://www.npmjs.com/). If you have it in your
system, then open a console in the project directory and run:
    
    $ npm start
    
With that, npm will set up the environment and open a browser with the app.

### Notes on execution
It is highly probable that your browser will complain about some [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
issues; because of that, you should download and activate the [CORS Chrome Plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).
Moreover, sometimes you will have to activate it *AFTER* starting the app with npm. 

## Clouding

This app is also running on a [Heroku](https://www.heroku.com) server. You can see it [here](https://picapp-web-app.herokuapp.com/).

### Notes on cloud app

As well as the mentioned CORS issues, when opening the app hosted in Heroku, your browser may
notify you that it is not a safe connection; to let the app work properly, just ignore the
notice and give it permission to execute..
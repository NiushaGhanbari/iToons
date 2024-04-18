# DoggoExplorer

This project is an Angular application generated with Angular CLI version 17.1.1. The primary goal of this project is to create a application where users can search for an artist and view the artist's Albums. The application utilizes the [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1) to fetch data.

## Development Server

To install dependencies and run the development server, execute the following commands:

```bash
npm install
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/) to access the application.

## Running Unit Tests

To execute the unit tests using [Karma](https://karma-runner.github.io), run the following command:

```bash
ng test
```

## Project Overview

<img width="1440" alt="Screenshot 2024-02-04 at 22 07 17" src="https://github.com/NiushaGhanbari/doggo-explorer/assets/76013251/5d2ec3a0-1070-4d84-a309-09264d6bdb2a">

The primary features include:

- Implement a grid layout for desktops and a list layout for mobile devices.
- Fetch album data based on search terms, enable sorting, and implement infinite scrolling.
- Display details like cover, title, and track list for each album, ensuring details persist upon page refresh.

## Additional Features

While meeting the specified requirements, additional components such as ...

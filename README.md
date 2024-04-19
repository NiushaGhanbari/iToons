# iToons!

This project is an Angular application generated with Angular CLI version 17.1.1. The primary goal of the project is to create an application where users can search for an artist and view the artist's Albums. The application uses the [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1) to fetch data.

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

Here are some screenshots of the application:

<img width="360" alt="Screenshot 2024-04-19 at 15 07 23" src="https://github.com/NiushaGhanbari/iToons/assets/76013251/100e76d7-cf8f-40f4-a910-f7834657c0d9">
<img width="360" alt="Screenshot 2024-04-19 at 15 07 43" src="https://github.com/NiushaGhanbari/iToons/assets/76013251/d55ad64d-65ae-494e-bb63-96a8f50c4dfd">
<img width="1268" alt="Screenshot 2024-04-19 at 15 08 07" src="https://github.com/NiushaGhanbari/iToons/assets/76013251/f6b24a77-16c3-4b92-b4d3-7cb2a3c8764a">

# Design Decisions

- In the main page, the user can search for an artist and view the artist's albums. Also, in order to make the main page more engaging, some albums from my favorite artists are displayed by default. In a real-world scenario, this could be replaced with a list of trending artists or albums.
- In album details, the user can view the album cover, title, artist, release date, and track list. As a bonus, I have added the feature to play a preview of the track. :smiley:
- I have chosen Angular Material for the UI components due to its seemless integration with Angular and the ease of use. For handling different screen sizes, I have managed it by CSS media queries for finer control over responsive behaviors since we have simple layouts. However, for a more complex layout, we can consider other libraries.
- The application is designed to be mobile first. The layout is responsive and adapts to different screen sizes and tested on Chrome and Safari.

# Future Improvements

- Although I have added some comments to the code, there is room for improvement in terms of code documentation.
- All services related to music are implemented in MusicService. In a more complicated scenario, it would be better to separate the services into different ones (seperation of concerns).
- I have tried to keep the code clean and simple to be commited to time constraints. However, there is always room for improvement in terms of code quality, performance and best practices.
- The application handle some errors. In a real-world scenario, it would be better to handle more errors gracefully.
- Add a loading spinner when the application is fetching data and skeleton loading for the album details.
- Add more unit tests to increase the test coverage and edge cases.
- At the moments, some output logs are displayed in the console. In a real-world scenario, it would be better to use a logger service.

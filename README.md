# Solen SPA

> This project represents the « front end » of [Solen LMS](https://github.solenlms.com) solution. 
It's built with `Angular` along with `Angular Material`. Demo at [https://demo.solenlms.com](https://demo.solenlms.com/).
 

# Table of Contents
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Configuration](#configuration)
    * [Running the application](#running-the-application) 
* [Design and coding practices](#Design-and-coding-practices)
     * [Splitting the app into multiple feature modules](#splitting-the-app-into-multiple-feature-modules)
     * [Lazy-loading](#lazy-loading)
     * [Use of Smart vs. Dumb Components](#use-of-smart-vs-dumb-components)
     * [Use of a State Management Library](#use-of-a-state-management-library)
     * [Use of `OnPush` change detection strategy and `async` pipe](#use-of-onpush-change-detection-strategy-and-async-pipe)

* [Contribution](#contribution)

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` : Ensure you're running the latest [Node.js LTS](https://nodejs.org/en)
* `Solen-SPA` depends on the [Solen Api](https://github.com/imanys/Solen.Api) to be functional. In order to use all the features locally, you should install 
the [Solen Api](https://github.com/imanys/Solen.Api) in your machine as well.

## Installing
```bash
# clone the repo
git clone https://github.com/imanys/Solen-SPA.git

# change directory to the repo
cd Solen-SPA

# install the repo with npm
npm install
```
## Configuration
The `Angular CLI` allows us to define multiple custom configurations which we will align with our infrastructure’s environment. However, this mechanism has two major downsides : 
 * Every time we need to create a new environment, or to update an existing one, we have to rebuild the application.
 * Checking the application's config files into the code repository can introduce security risks

In order to configure the application without rebuild it and without leaking any confidential configuration details, I've found a solution described in this [article](https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild). \
The idea behind is to extract all configuration details out of our `Angular` application, and put them in a separated file called `env.js` located in the same directory as the application `index.html` :
```javascript
(function (window) {
  window.__env = window.__env || {};

  window.__env.apiUrl = 'http://localhost:5000/api'; // Solen API Base URL
  window.__env.isSigningUpEnabled = true; // Indicates whether or not the Sign up button should be displayed
  window.__env.wsEventsUrl = 'http://localhost:5000/ws/events'; // // Web Socket Server URL (SignalR)
  window.__env.whitelistedDomains = ['localhost:5000']; // Domains allowed to receive the JWT Token
  window.__env.blacklistedRoutes = []; // Routes to which we should NOT send the JWT token
}(this));
```

The `index.html` must then include a reference to the `env.js` file in the `<head>` section **before** `Angular` is loaded :
 ```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <!-- Load environment variables -->
    <script src="env.js"></script>
  </head>

  <body>
    ...
    <!-- Angular code is loaded here -->
  </body>  
</html>  
```
N.B: For the same security risks mentioned above, the `env.js` file is NOT checked into this code repository. 
Instead, there is a template file called `env.template.js` which you can rename to `env.js`.
 
## Running the application
After you have installed all dependencies you can now run the app. Run `ng serve` for a dev server :
```bash
# start the dev server
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

![](https://user-images.githubusercontent.com/52765247/91655405-96996380-eab0-11ea-8d4d-c90683056c18.png)

# Design and coding practices
To help make the application cleaner and more performant, some coding practices and recommendations have been followed while developing the app :
 
## Splitting the app into multiple feature modules
By splitting the application into multiple feature modules, the project structure is better organized, it is more maintainable, readable and reusable,
and we are able to use the `lazy-loading` feature as we'll see in the next section. 
Each module can have its own routing module, state, components, services... \
The Angular’s official documentation states :
> *A feature module is an organizational best practice, as opposed to a concept of the core Angular API. 
> A feature module delivers a cohesive set of functionality focused on a specific application need such as a user workflow, routing, or forms. 
> While you can do everything within the root module, feature modules help you partition the app into focused areas.
> A feature module collaborates with the root module and with other modules through the services it provides and the components, directives, and pipes that it shares.*

## Lazy-loading
With the `Lazy-loading` feature, a module will load only when it is used. This will reduce significantly the size of the application 
load initial time and improve the application boot time by not loading the unused modules.

More about `Lazy-loading` [here](https://angular.io/guide/lazy-loading-ngmodules).
## Use of Smart vs. Dumb components
`Smart Components` (or `Container Components`) are components that have external dependencies or cause side effects. They are connected to a service or to a state management system and know
how to load data and persist changes.\
`Dumb Components` (or `Presentation Components`) on the other hand, are components that have no external dependencies and cause no side effects. 
They flow data through their `@Input` and `@Output` decorators. In general, each `Dumb Component` is a *child* component of a `Smart Component`. \
`Dumb components` are completely reusable and testable since they have a defined API and are independent of any business logic.
Hence, it's recommended to create as many dumb components as possible.

To read more about the subject, take a look at this [article](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why).

## Use of a State Management Library
`Solen-SPA` uses [NgRx](https://ngrx.io) as a State Management library. `NgRx` is a Reactive State Management for `Angular` inspired by `Redux` architecture
 and using `RxJS` observables of `Angular`.\
Using observables to fetch data from the store make the use of the `onPush` Change Detection Strategy and  `async` pipe easier as we'll see in next section.

Learn more about `NgRx` and `State Management` in this [article](https://levelup.gitconnected.com/angular-ngrx-a-clean-and-clear-introduction-4ed61c89c1fc).  

## Use of `OnPush` change detection strategy and `async` pipe
By default,  `Angular` uses the strategy `ChangeDetectionStrategy.Default` to check whether a component's view should be updated. This strategy means that every time something changes in our 
application (as a result of `DOM` events, timers, `XHR`, etc.) a change detection will run on **ALL** components.
As the application grows, `Angular` will have to work harder to keep track of all the changes. \
To help Angular and give it an indication of when to check a component, we can use the `OnPush` detection change strategy. 
With this strategy, the change detection of a component will be triggered only when any of the following scenarios occurs :
  * Input reference of the component change
  * DOM Event within the component has been dispatched (ex. click)
  * Change detection is manually run
  * Emission of an observable event subscribed with `async` pipe
     
In the most cases in `Solen SPA`, we make a use of `async` along with `NgRx` observables : every time a change occurs in the `State Store`, an event is emitted, and the component's view is updated. 
Furthermore, with `async` pipe we don’t have to deal with the Observables subscription/unsubscription by ourself. 

Check the [Angular documentation](https://angular.io/api/core/ChangeDetectionStrategy) out for more details.

# Contribution
For the moment, I will be the only contributor of the project. Nevertheless, you're welcome to report bugs or/and submit features by creating issues.  

## Overview

TASKMASTER is database of Drivers, Enablers, and Initiatives built in React.

It's aim is to support organisations who want to become more Agile, by giving them tools to help them allocate some of their resources into a pool to work on Lean, experimental initiatives, and for those resources to have enough visibility of enterprise priorities and experiments to be able to work in a self-organised way.

### Drivers

Drivers are high level priorities which an organisation will only have a handful of at any given time. The user orders drivers in their order of importance, sequentially.

### Enablers

Enablers are action the organisation is taking in order to meet those drivers. An organisation should expect to have between a dozen and two dozen of these, depending on the size. When creating Enablers, the user chooses the drivers the enabler contributes towards, and at what level (MAJOR/MINOR/etc)

### Initiatives

Initiatives are work packages which operate under Lean Startup principles. When creating Initiatives, the user chooses the enablers which it contributes towards, in the same way they would enabler to drivers.

## Features

### Shared Priorities, derived priorities

Enablers and Initiatives have their priorities (and thus, the order in which they should be undertaken) calculated based on their contributions up the stack, and the absolute priorities of the top level drivers. They are not individually prioritised, other than by how much they contribute, and what their cost relative cost is. This gives C-level executives the ability to change priorities of enablers and drivers at a high level, knowing that this will change the priorities of experimental work linked to them, without needing to constantly re-prioritise at a lower granularity. Reducing the number of things executives need to prioritise, and providing that currency, is key to agile governance.

## Self-organisation

Anyone can sign up to initiatives and contribute using the tool, and they have clear visibility of the skills that are needed as well as the priorities of the things they can work on. Providing clear visibility of work across the whole organisation (not seperated into distinct project pots) is key to effective self-organisation, and key to breaking down organisational fragmentation as a result of things like Conway's Law.

## Management information to support resource management

Charts give clear views on vacancies, availability, shortfalls and so on, in order to help them understand how many people should be made available at any given time to work on initiatives. This information is key to enabling executives (and their immediate strategic delegates) understand how to balance between the resources available to work on Lean intiatives, versus those allocated to traditional commodity teams. We highly recommend this is achieved through seconding through those commodity teams, rather than permanently reserving resources, in order to avoid separation of knowledge between those experimenting, and those working on commodities.

## Todo

The project is currently read only. An Express node server supporting routes which wrap a Mongo db is coming!

---

## The following is from the default create-react-app readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

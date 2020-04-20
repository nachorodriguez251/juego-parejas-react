![Cognizant logo](../../img/logo.png)

# React Styleguide

The following guide is a recopilation of highly adopted practices on the React Community. Most of the concepts contained here will be either in www.reactjs.com or from the [AirBnB](https://github.com/airbnb/javascript) styleguide.

**Table of Contents**

- [Architecture](#architecture)
  - [Components](#components)
    - [Component Design](#component-design)
    - [Component Naming](#component-naming)
  - [Redux - State Management](#redux)
- [Folder structure](#folder-structure)
- [Good practices](#good-practices)
  - [Extensions](#extensions)
  - [Single Responsability](#single-responsability)
  - [Avoid excessive use of external libs](#avoid-excessive-use-of-external-libraries)

## Architecture

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

Each component can have an internal state and properties( A.K.A props ) to define the component behaviour

The idea behind this concept is to be able to not only use this components but **reuse** them and **test them separately**

**Reusable components** reduces significantly code duplication, reduces the hours a developer needs to complete a feature and keeps the code modular and more maintainable.

### Components

There are currently two ways to create a Component in React:

```javascript
// Functional Component

import React, {useState, useEffect} from 'react'
import {getUserData} from "./api";

function Sidebar(props){

    useEffect(()=>{
        getUserData();
    },[])

    return (
        <div>
            Hi there! Foo Bar
        </div>
    )
}

```

```javascript
// Class Component

import React, {useState} from 'react';
import {getUserData} from "./api";

class Sidebar extends React.Component{
    constructor(props){
        this.state = {
            user: "Foo Bar"
        }
    }

    componentDidMount(){
        getUserData();
    }

    render(){
        return (
            <div>
                Hi there! Foo Bar
            </div>
        )
    }
    
}

```

Functional component syntax is more brief and succint; that is why **React Hooks** are gaining traction since they were released in v.16.8. 

Prior to v.16.8, class component had features that functional components didn't have yet, so in some way you were "forced" to use Class Components. 

After v.16.8 every ```Class``` component has a ```function``` counterpart. We recommend to migrate to the last stable version of ```React``` and choose functional components over class components.

#### Component Design
React, at its core, follows Atomic Design inherently by encouraging developers to keep components as simple and as broken down as possible. From this simplicity, we can create more complex components and containers of components to create the user interfaces of our applications. Following these patterns gives us, as developers, an easy to manage (and test) ecosystem within our React applications.


- Start Small.
- Start specific.
- Rigid or Flexible component - Props are easy to add. But hard to remove.


| Rigid Components        | Flexible Components  |
| ------------- |:-------------:| -----:|
| Can lead to a big amount of components | Reusable in more contexts |  
| Simpler to create and implement     |  Can be harder to implement |
| Easier to understand | A big amount of props can |
| Easy to add flexibility | Can be harder to modify |  


Tips:

- Honor the Single Responsability Pattern.
- Avoid weak elements or excessive div wrappers - Use [React Fragments](https://en.reactjs.org/docs/fragments.html) wherever is possible.
- Declare PropTypes.
- Don't hardcode HTML Ids.

- Always use camelCase for prop names.

```tsx
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>

```
- Consider Configuration Object

```tsx

// bad
<Component prop1={a} prop2={b} prop3={c} prop4={d} prop5={e} />

// good

const props = {prop1:a, prop2:b, prop3:c, prop4:d, prop5: e};

<Component {...props} />

```

-Omit the value of the prop when it is explicitly true. 
```tsx

// bad
<Foo hidden={true}/>

// good
<Foo hidden/>

// good
<Foo hidden />

```

#### Component Naming

- Extensions: Use .tsx extension for React components. 
- Filename: Use PascalCase for filenames. E.g., ReservationCard.tsx.
- Reference Naming: Use PascalCase for React components and camelCase for their instances.
 

```tsx
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />

// good
const reservationItem = <ReservationCard />

```

- Component Naming: Use the filename as the component name. For example, ReservationCard.jsx should have a reference name of ReservationCard. However, for root components of a directory, use index.jsx as the filename and use the directory name as the component name.

```tsx
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';

```


- Avoid using DOM component prop names for different purposes.

```javascript
// bad
<MyComponent style="fancy" />

// bad
<MyComponent className="fancy" />

// good
<MyComponent variant="fancy" />

```

- Props Naming: Avoid using DOM component prop names for different purposes.

```tsx
// bad
<MyComponent style="fancy" />

// bad
<MyComponent className="fancy" />

// good
<MyComponent variant="fancy" />

```

### Redux
 Redux is a **predictable state container** for JavaScript apps. Redux makes it easy to manage the state of your application. Another way of looking at this - it helps you manage the data you display and how you respond to user actions.

 ```
    --Actions --> Dispatcher --> Store --
    │                                   │
    │--------------View-----------------│
 ```

- Do not mutate state.
- Reducers must be pure functions and the single source of truth.
- Put as much logic as possible in Reducers
- Reducers should own the state shape.
- Allow many reducers to respond to the same action.
- Avoid dispatching many actions sequentially
- Use only one redux store per application.
- Use Immer for writting immutable updates.
- Use constants for Action Types.
- Use selectors for Calculated state and decoupling.
- Use as many selectors as you need in functional component. Prefer calling useSelector many times and retrieving smaller amounts of data, instead of having a single larger useSelector call that returns multiple results in an object
- Use ReduxDevTools for debugging.

## Folder structure

Keep a flat folder structure as long as possible. Consider creating sub-folders when a folder reaches seven or more files.

```

app/
│   index.html
│   main.tsx
└── assets/
│      images/
│      svg/
│      .../
│
└── components/
│       Sidebar/
│           styles.scss    
│           index.tsx
│           index.spec.tsx
│           styles.scss  
│
│       
└── containers/
│      Login/
│           index.tsx
│           index.spec.tsx
│           styles.scss
│         actions/
│           index.tsx
│           index.spec.tsx
│         actionTypes/
│           index.tsx
│         api/
│           index.tsx
│         components/
│             LoginBox/
│                index.tsx
│                index.spec.tsx
│                styles.scss  
│         hooks/
│           useGetLoginDetails.tsx
│         models/
│           index.tsx
│           user.tsx
│         reducers/
│           index.tsx
│           user.tsx
│         selectors/
│           index.tsx
│           getUser.tsx
│         types/
│           index.tsx
│           user.tsx
│         
│     .../
│
└── routes/
│       index.tsx
│       routes.tsx
└── base /
│       shared/
│       reducers/
│       store/
│       types/
│      .../
└── env /
│       env.common.ts
│       env.development.ts
│       env.production.ts
│       env.ts
 

```

## Assets

The assets folder will contain the static files of our application, such as images, icons, fonts, etc.

## Performance and optimization

**Performance**
We analyze each of the pages, their behavior, frames per second (preventing them from falling below 60) and carry out evaluations on conflicting code, such as for many records, which can seriously affect the performance of the application, especially in older browsers. In addition, we avoid unnecessarily rendering components using strategies such as changeDetection.OnPush, rendering only the component when it receives new properties.

**Bundle optimization**
It is important to keep the application as small as possible in size, for this it is important not to add unnecessary libraries, for this we perform analysis with webpack bundle analyzer, a webpack plugin that allows us to analyze the weight of our application, detect possible duplicate libraries, avoid imbalances in module weights and unnecessary dependencies.

## Good practices

### Extensions

There are two extensions that every React Developer should have:
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=es)
- [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es)

### Single Responsability

Apply the single responsibility principle (SRP) to all components, services, and other symbols. This helps to make the app cleaner, easier to read and maintain, and more testable.

### Avoid excessive use of external libraries

We avoid excessive use of libraries that are not necessary. This keeps the weight of the application low, and improves the loading performance of our applications.

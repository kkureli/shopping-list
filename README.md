# Shopping List App

### Project info

A basic, multifunctional and multilanguage shopping list app, where you can create lists, add items to them, after shopping delete or check the items.

#### ScreenShots - Native App


https://user-images.githubusercontent.com/33238066/181503484-e2038f2e-10ea-4aaa-80fd-54c0664baf68.mov

### Installation

In project directory:

1. run `npm install` or `yarn install`
2. `cd ios` && `pod install`
3. `cd ..`
4. `npx react-native run-ios` or `npx react-native run-android`

### Run on Device

- run `yarn android` or `yarn ios` to run on device or emulator

#### Project Structure

- ## `src`: This folder is the main container of all the code.
  - `api`: This folder contains all services and base request function.
  - `redux`: This folder contains all actions, slices, thunks and store which is provided by redux.
  - `assets`: Asset folder to store all images and icons.
  - `components`: Folder to store any common component that you use through app
  - `data`: Folder to store any kind of constant.
  - `localization`: Folder to store the languages files.
  - `navigation`: Folder to store the navigators.
  - `screens`: Folder that contains all application screens.
  - `theme`: Folder to store all the styling concerns related to the application theme.
  - `views`: Folder that contains all application views.
  - `utils`: Folder that contains utility functions, enums and types.
- ## `__test__`: Folder to store all tests

### App Features

- Multilanguage support for English, Estonian, Turkish
- Dark and light theme functionality
- Autocomplete suggestions while adding new list and item
- Create multi lists
- Swipe to delete functionality for lists and items
- Create, Update, Delete functionaliy for lists and items

### Testing

To run the tests, execute `yarn test` in a terminal opened in the project folder.

## Commit Message Types

```
[TICKET] [TYPE]: [COMMIT MESSAGE]
```

For example:

```
AIP-000 fix: style file updated.
```

| type     | release |
| -------- | ------- |
| breaking | major   |
| feat     | minor   |
| fix      | patch   |
| build    | patch   |
| style    | patch   |
| refactor | patch   |
| perf     | patch   |
| chore    | none    |
| ci       | none    |
| docs     | none    |
| test     | none    |



[Docs](./) / Tutorial

Tutorial
========

Every data object in Yote is treated as a resource module &mdash; meaning a bundle of relatively self-contained services that exist on the front-end (modules) or backend (resources). Yote comes with three on init: Users, Posts, and Products.

Almost every data-driven app we build relies on a user object with login authentication, varying roles and permissions, etc.  The user resource module should be useful for every project.

Posts and Products are general purpose examples. Products are simple. Posts are a little more complicated. In this tutorial, we'll add Comments to go with Posts.

## Add a new resource module
From the root directory of `MyApp` run the following:

```
$ yote add comment
```

This will add Comments as a resource for the server, and a module for the client and mobile, each with verbosely named CRUD files.  

```
MyApp/
  --- server/           
    ...
    |_ resources/
      |_ comments/          # + data model, api and controllers
        |_ CommentModal.js
        |_ commentsApi.js
        |_ commentsController.js
    ...
  --- client/           
    ...
    |_ modules/
      |_ comments/          # + actions, reducers, styles and components
        |_ components/
          |_ CreateComment.js.jsx
          |_ CommentForm.js.jsx
          |_ CommentLayout.js.jsx
          |_ CommentList.js.jsx
          |_ CommentListItem.js.jsx
          |_ SingleComment.js.jsx
          |_ UpdateComment.js.jsx
        |_ commentActions.js
        |_ commentReducer.js
        |_ commentRoutes.js.jsx
        |_ commentStyles.scss
    ...            
  --- mobile/          
    |_ MyApp/      
      ...
      |_ js/                
        |_ modules/
          |_ comments/      # + actions, reducers, styles and components  
      ...                
```

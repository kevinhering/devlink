# DevLink

[DevLink](https://devlink-api.herokuapp.com/) a Tool to enable development teams to share knowledge, projects and communicate. It utilizes a node/express API and a react SPA client (more planned).

It's currently a work in progress with a number of improvements coming (authentication, pagination, real-time messaging, search interface improvements and more...)

# DevLink API Basics

## Routes

### USER ROUTES

#### GET api/users/test

description: test the users route
access: public

#### GET api/users/register

description: register a user
access: public

#### GET api/users/login

description: login & recieve JWT
access: public

#### GET api/users/current

description: return current user (using stateless jwt)
access: private

### PROFILE ROUTES

#### GET api/profile/test

description: test profile route
access: public

#### GET api/profile

description: get current user profile
access: private

#### GET api/profile/handle/:handle

description: get current user profile via handle
access: public

#### GET api/profile/user/:userid

description: get current user profile via user id
access: public

#### GET api/profile/all

description: get all profiles
access: public

#### POST api/profile

description: create or update profile for current (authorized) user
access: private

#### DELETE api/profile/

description: remove a user & profile
access: private

#### POST api/profile/projects

description: add a project to profile
access: private

#### GET api/profile/projects/:project_id

description: retrieve an existing project by id
access: private

#### PUT api/profile/projects/:project_id

description: edit an existing project
access: private

#### DELETE api/profile/projects/:project_id

description: remove a project from profile
access: private

#### POST api/profile/resources

description: add a resource to profile
access: private

#### GET api/profile/resources/:resourceid

description: retrieve an existing resource
access: private

#### PUT api/profile/resources/:resourceid

description: edit an existing resource
access: private

#### DELETE api/profile/resources/:resource_id

description: remove a resource from profile
access: private

### POSTS ROUTES

#### GET api/posts/test

description: test post route
access: public

#### POST api/posts

description: create post
access: private

#### PUT api/posts/:post_id

description: update existing post
access: private

#### DELETE api/posts/:post_id

description: delete post
access: private

#### GET api/posts

description: retrieve all posts (sorted by date)
access: public

#### GET api/posts/:post_id

description: get specific post (by id)
access: public

#### POST api/posts/comment/:post_id

description: add a new comment on a post
access: private

#### PUT api/posts/comment/:post_id/:comment_id

description: edit a comment on a post
access: private

#### DELETE api/posts/comment/:post_id/:comment_id

description: delete a comment on a post
access: private

#### POST api/posts/like/:post_id

description: like a post
access: private

#### POST api/posts/unlike/:post_id

description: unlike a post
access: private

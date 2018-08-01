# DevLink

[DevLink](https://devlink-api.herokuapp.com/) a Tool to enable development teams to share knowledge, projects and communicate. It utilizes a node/express API and a react SPA client (more planned).

It's currently a work in progress with a number of improvements coming (authentication, pagination, real-time messaging, search interface improvements and more...)

# DevLink API Basics

## Routes

### USER ROUTES

@route GET api/users/test
@desc test the users route
@access public

@route GET api/users/register
@desc register a user
@access public

@route GET api/users/login
@desc login & recieve JWT
@access public

@route GET api/users/current
@desc return current user (using stateless jwt)
@access private

### PROFILE ROUTES

@route GET api/profile/test
@desc test profile route
@access public

@route GET api/profile
@desc get current user profile
@access private

@route GET api/profile/handle/:handle
@desc get current user profile via handle
@access public

@route GET api/profile/user/:userid
@desc get current user profile via user id
@access public

@route GET api/profile/all
@desc get all profiles
@access public

@route POST api/profile
@desc create or update profile for current (authorized) user
@access private

@route DELETE api/profile/
@desc remove a user & profile
@access private

@route POST api/profile/projects
@desc add a project to profile
@access private

@route GET api/profile/projects/:project_id
@desc retrieve an existing project by id
@access private

@route PUT api/profile/projects/:project_id
@desc edit an existing project
@access private

@route DELETE api/profile/projects/:project_id
@desc remove a project from profile
@access private

@route POST api/profile/resources
@desc add a resource to profile
@access private

@route GET api/profile/resources/:resourceid
@desc retrieve an existing resource
@access private

@route PUT api/profile/resources/:resourceid
@desc edit an existing resource
@access private

@route DELETE api/profile/resources/:resource_id
@desc remove a resource from profile
@access private

### POSTS ROUTES

@route GET api/posts/test
@desc test post route
@access public

@route POST api/posts
@desc create post
@access private

@route PUT api/posts/:post_id
@desc update existing post
@access private

@route DELETE api/posts/:post_id
@desc delete post
@access private

@route GET api/posts
@desc retrieve all posts (sorted by date)
@access public

@route GET api/posts/:post_id
@desc get specific post (by id)
@access public

@route POST api/posts/comment/:post_id
@desc add a new comment on a post
@access private

@route PUT api/posts/comment/:post_id/:comment_id
@desc edit a comment on a post
@access private

@route DELETE api/posts/comment/:post_id/:comment_id
@desc delete a comment on a post
@access private

@route POST api/posts/like/:post_id
@desc like a post
@access private

@route POST api/posts/unlike/:post_id
@desc unlike a post
@access private

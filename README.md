# Follows #

Provides social network style Follows.

## Follows ##

### Follow (class) - Extends [BaseModel](https://github.com/copleykj/socialize-base-model)  ###

To gain access the methods of a follow you must first have an instance of a follow. You can obtain an instance by performing a query on the follow collection. A `findOne` will return an instance and a `find` will return a cursor which when iterated over will return an instance for each iteration. Ways of obtaining instances that belong to the current user are provided as extensions to the `User` class and are detailed in the [User Extensions](#user-extensions) section of this document

```javascript
var follow = Meteor.follows.findOne(); //instance of Follow

var follows = Meteor.follows.find();  //cursor which returns Follow instances
```
#### Instance Methods ####

_**all examples assume an instance of `Follow` as `follow`**_

**user** - The User instance for the follow.

```javascript
follow.user(); //the user instance for the follow instance.
```

**isDuplicate** - check to see if a follow already exists between the current user and the (calling) user.

```javascript
follow.isDuplicate(); //boolean if follow already exists.
```

## User Extensions ##
This package extends the [socialize:user-model](https://github.com/copleykj/socialize-user-model) package with properties and methods that apply the the user in the context of follows and follow requests.

_**All code examples assume an instance of `User` as `currentUser`**_

```javascript
var currentUser = Meteor.user();
```

### Instance Methods ###

**following(limit, skip)** - Gets user's following users. Returns a Mongo.Cursor which yields Follow instances

```html
{{#each currentUser.following}}
    <!-- instance of Follow not User -->
    <p>{{user.username}}</p>
{{/each}}
```

**followingAsUsers(limit, skip)** - Get user's following as the users they represent. Returns a Mongo.Cursor which yields User instances.

```html
{{#each currentUser.followingAsUsers}}
    <!-- User instances this time instead of Follow instances -->
    <p>{{username}}</p>
{{/each}}
```

**followers(limit, skip)** - Get user's follower users. Returns a Mongo.Cursor which yields Follow instances

```html
{{#each currentUser.followers}}
    <!-- instance of Follow not User -->
    <p>{{user.username}}</p>
{{/each}}
```

**followersAsUsers(limit, skip)** - Get followers for user as the users they represent. Returns a Mongo.Cursor which yields User instances.

```html
{{#each currentUser.followersAsUsers}}
    <!-- User instances this time instead of Follow instances -->
    <p>{{username}}</p>
{{/each}}
```

**follow** - Add a follow connection from the current user to the (calling) user.

```javascript
Template.userProfile.events({
    'click [data-action=follow]': function() {
        //assumes context is a instance of a user
        this.follow();
    }
});
```

**unfollow** - Sever the follow connection from the current user to the (calling) user.

```javascript
Template.userProfile.events({
    'click [data-action=unfollow]': function() {
        //assumes context is a instance of a user
        this.unfollow();
    }
});
```

**isFollowed** - Check if the current user is following the (calling) user.

```html
{{#if this.isFollowed}}
<p>You are following this user</p>
{{/if}}
```

## Publications ##

Data publications for this package are not provied as data publications are generally very application specific, and the choice of join package a personal one, so instead examples of how to publish data with `tmeasday:publish-with-relations` can be found on the [github wiki page for this package](https://github.com/copleykj/socialize-follow/wiki/Publications).

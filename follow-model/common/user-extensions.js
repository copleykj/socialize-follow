User.methods({

    /**
     * Retrieve a list of follow connections
     * @method following
     * @param   {Number}        The number of records to limit the result set too
     * @param   {number}        The number of records to skip
     * @returns {Mongo.Cursor}  A cursor of which returns Follow instances
     */
    following:function (limit, skip) {
        var options = {limit:limit, skip:skip, sort:{date:-1}};
        return FollowsCollection.find({userId:this._id}, options);
    },

    /**
     * Retrieve a list of reverse follow connections
     * @method followers
     * @param   {Number}        The number of records to limit the result set too
     * @param   {number}        The number of records to skip
     * @returns {Mongo.Cursor}  A cursor of which returns Follow instances
     */
    followers:function (limit, skip) {
        var options = {limit:limit, skip:skip, sort:{date:-1}};
        return FollowsCollection.find({followId:this._id}, options);
    },

    /**
     * Retrieves follow connections as the users they represent
     * @method followingAsUsers
     * @param   {Number}       limit     The maximum number or follows to return
     * @param   {Number}       skip      The number of records to skip
     * @returns {Mongo.Cursor} A cursor which returns user instances
     */
    followingAsUsers:function (limit, skip) {
        var ids = this.following(limit, skip).map(function(follow){
            return follow.followId;
        });

        return Meteor.users.find({_id:{$in:ids}});
    },

    /**
     * Retrieves reverse follow connections as the users they represent
     * @method followersAsUsers
     * @param   {Number}       limit     The maximum number or follows to return
     * @param   {Number}       skip      The number of records to skip
     * @returns {Mongo.Cursor} A cursor which returns user instances
     */
    followersAsUsers:function (limit, skip) {
        var ids = this.followers(limit, skip).map(function(follow){
            return follow.userId;
        });

        return Meteor.users.find({_id:{$in:ids}});
    },

    /**
     * Add the followship connection from the logged in user to the user
     * @method follow
     */
    follow:function () {
        new Follow({userId:Meteor.userId(), followId:this._id}).save();
    },

    /**
     * Remove the followship connection from the logged in user to the user
     * @method unFollow
     */
    unfollow:function () {
        var follow = FollowsCollection.findOne({userId:Meteor.userId(), followId:this._id});

        follow && follow.remove();
    },

    /**
     * Check if the user follows another
     * @method isFollowed
     * @returns {Boolean} Whether the user followed by the logged in user
     */
    isFollowed: function () {
        return !!FollowsCollection.findOne({userId:Meteor.userId(), followId:this._id});
    }

});
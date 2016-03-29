FollowsCollection.allow({
    insert:function (userId, follow) {
        return userId && follow.checkOwnership() && !follow.isDuplicate();
    },
    remove:function (userId, follow) {
        return userId && follow.checkOwnership();
    }
});
/**
 * The Follow Class
 * @class Follow
 * @param {Object} document An object representing a Follow ususally a Mongo document
 */
Follow = BaseModel.extendAndSetupCollection("follows");

FollowsCollection = Follow.collection;

/**
 * Get the User instance for the follow
 * @function user
 * @memberof Follow
 */
Follow.prototype.user = function () {
    if(this.followId){
        return  Meteor.users.findOne(this.followId);
    }
};

/**
 * Check if the user already follows the user
 * @memberof Follow
 * @returns {Boolean} Returns if the follow already exists
 */
Follow.prototype.isDuplicate = function () {
    return !!FollowsCollection.findOne({userId:this.userId, followId:this.followId});
};


//Create the schema for a follow
Follow.appendSchema({
    "userId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        autoValue:function () {
            if(this.isInsert){
                if(!this.isSet && this.isFromTrustedCode){
                    return Meteor.userId();
                }
            }
        },
        index: 1,
        denyUpdate:true
    },
    "followId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        index: 1
    },
    "date":{
        type:Date,
        autoValue:function() {
            if(this.isInsert){
                return new Date();
            }
        },
        denyUpdate:true
    }
});
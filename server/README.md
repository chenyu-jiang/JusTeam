# JusTeam
## Client-Server Interfaces

## /api

### /api/posts

* api/posts/upload
  * api/posts/upload/pictures

      Post pictures to this url.

      **Requirements**: One file at a time.

      **Method**: POST

      **Fields**:

      1. *image* : image file

      **Response**:

      ```json
      {"path" :"RELATIVE_PATH/TO/FILE.png"}
      ```

  * api/posts/upload/articles

    Post text content to this url.

    **Requirements**: One file at a time.

    **Method**: POST

    **Fields**:

    1. *article*: article content

    2. postTitle: title of the post

    3. *teamID*: the team this post will be attached to

    4. *eventID*: the event this post will be attached to

    5. *tags*: an json array object containing tags

       *example:*

       ```json
       {tags:["tag1","tag2"]}
       ```

    6. *isNew*: If isNew is true, it will generate a new item and a new postID. If it's false, it will update the old post item.

    7. *postID*: If not new post, the old postID must be submitted

    8. isFinal: If isFinal is true, it will be set to Final and can be searched through SearchSystem, and be visible from team and event system.

       **NOTE:**once a post is set as Final, it cannot be set back to draft.

    **Response**:
    ```json
    {
        "status": true,
        "postID": 12345
    }
    ```

* api/posts/setFinal

  Set the status of the post to Final if it is a draft.

  **Requirements**: None.

  **Method:** GET

  **Parameters:**

  1. postID

  **Response**:

  ```json
  {"status":true}
  ```

* api/posts/articles

  Get the content of the post.

  **Requirements**: None.

  **Method**: GET

  **Parameters**:

  1. postID: id of the post

  **Response**:
    ```json
  {
      "status":true,
      "content":{
          "post_ID": 1,
          "user_ID": 23,
          "path": "path/on/server",
          "timeStamp": "LastEditTime",
          "team_ID": 123,
          "event_ID": 234,
          "isFinal": 1,
          "postTitle": "Title",
          "tags": "[\"test1\",\"test2\"]",
          "content": "Article Content."
      }
  }
    ```

* api/posts/delete

  Delete a post.

  **Requirements:** None.

  **Method:** DELETE

  **Parameters:**

  1. postID: id of the post

  **Response:**

  ```json
  {"status": true}
  ```

###api/team

* api/team/TeamOP

​          **api/team/teamOP/createTeam**

​          **Requirements**: None.

​          **Method**: POST

​           **Parameters**:              

{

introduction : string

teamTitle: string

maxMember : integer 

category : string

status : string

reminder : string

}

 

​           **Response**: {state: 'success'/'fail', insertID: integer}

 

​          *** api/team/teamOP/deleteTeam**

 

​           **Requirements**: None.

 

​            **Method**: GET

 

​           **Parameters**:

 

​              teamID :integer // the ID of team which is going to be deleted

 

​           **Response**:  {state : 'success'/ 'fail'}

 

​          *** api/team/teamOP/editTeam**

 

​           **Requirements**: None.

 

​            **Method**: POST

 

​            **Parameters**:

 

 {

'teamID' :integer

Introduction :string

'teamTitle' :string

'maxMember' = integer

'category' :string

'status' :'string'

'reminder' :string

}

 

​           **Response**:  {state : 'success'/ 'fail'}

 

​          *api/team/TeamOP/addMember

 

​           **Requirements**: None.

 

​            **Method**: GET

 

​           **Parameters**:

 

​              teamID :integer

 

​              newMember: integer // which is the userID to be added

 

​           **Response**: {state : 'success' / 'fail'}

 

​          *** api/team/teamOP/applyForTeam**

 

​           **Requirements**: None.

 

​            **Method**: POST

 

​           **Parameters**:

 

​              teamID :integer

 

​            application: string

 

​           **Response**: {state : 'success' / 'fail'}

 

​          *** api/team/teamOP/deleteMember**

 

​           **Requirements**: None.

 

​            **Method**: GET

 

​           **Parameters**:

 

​              teamID :integer

 

​              deletedMember: integer //which is the userID to be deleted

 

​           **Response**: {state : 'success' / 'fail'}

 

​          *** api/team/teamOP/editAuthority**

 

​           **Requirements**: None.

 

​            **Method**: GET

 

​           **Parameters**:

 

​              userToChange: integer

 

​              rightToChange: integer

 

​              teamID :integer

 

​           **Response**: {state : 'success' / 'fail'}

 

​    *** api/team/teamInfo**

 

​          *** api/team/teamInfo/getRecommend**

 

​           **Requirements**: None.

 

​            **Method**: GET

 

​           **Parameters**: None

 

**Response**: {state : 'success'/ 'fail', recommendTeams : anarray of team objects}

 

​           *** api/team/teamInfo/getUserTeams**

​            

​            **Requirements**:None.

 

​            **Method**: GET

 

​           **Parameters**:

 

​              teamList  // an array of all the teamID attached to ateam

 

​           **Response**: an array of team object

 

​          *** api/team/teamInfo/viewOneTeam**

 

**Requirements**: None.

 

​            **Method**: GET

 

​           **Parameters**: 

 

​            teamID :integer

 

​           **Response**: {state : ‘success’/ ‘fail’, team : a team object}

 

 

***api/event/eventOP**

​            

​            ***api/event/eventOP/createEvent**

 

**Requirements**: None.

 

​            **Method**: POST

 

​           **Parameters**: 

 

​            {

​                        teamID: integer

​                        startTime: string

​                        endTime: string

​                        title: string

​                        location: string

​                        specification: string

}

 

​           **Response**: {state : ‘success’/ ‘fail’, insertID : integer}

 

​            ***api/event/eventOP/deleteEvent**

​            

**Requirements**: None.

 

​            **Method**: GET

 

​           **Parameters**: 

 

​            teamID :integer

 

​            eventID :integer

 

​           **Response**: {state : ‘success’/ ‘fail’ }

 

​            

***api/event/eventOP/editEvent**

 

**Requirements**: None.

 

​            **Method**: POST

 

​           **Parameters**: 

 

​            {

​                        teamID: integer

​                        eventID: integer

​                        startTime: string

​                        endTime: string

​                        title: string

​                        location: string

​                        specification: string

}

 

​           **Response**: {state : ‘success’/ ‘fail’ }

 

***api/event/eventInfo**

 

***api/event/eventInfo/getTeamEvents**

 

**Requirements**: None.

 

​            **Method**: GET

 

​           **Parameters**: 

 

​            eventList :the save eventList in the team object

​            

**Response**: {state : ‘success’/‘fail’ , events : an array of event object, postList : an 

 

array of postID }

 

***api/event/eventInfo/viewOneEvent**

 

**Requirements**: None.

 

​            **Method**: GET

 

​           **Parameters**: 

 

​            eventID :integer

​            

​           **Response**: {state : ‘success’/ ‘fail’ , event : an event object}

 

 

​            

 

​            

 

 

 

 

 

 

### api/accounts



### api/notifications

* api/notifications/new/content

  Get new notifications of a user.

  **Requirements**: None.

  **Method** : GET

  **Parameters**: None

  **Response**: See [NotificationSystem](./NotificationSystem/README.md)

* api/notifications/new/number

  Get number of new notifications of a user.

  **Requirements**: None.

  **Method** : GET

  **Parameters**: None

  **Response**: See [NotificationSystem](./NotificationSystem/README.md)

* api/notifications/history

  Get notification history of a user.

  **Requirements**: None.

  **Method** : GET

  **Parameters**:

  1. start: starting from
  3. end: end with

  **Response**: See [NotificationSystem](./NotificationSystem/README.md)

* api/notifications/delete

  Delete a notification history of a user.

  **Requirements**: None.

  **Method** : DELETE

  **Parameters**:

  1. messageID
  2. messageType

  **Response**: See [NotificationSystem](./NotificationSystem/README.md)



### api/search

* api/search

  * api/search/team

    This is the entry for team search function.

    **Requirements:**None.

    **Method:** GET

    **Parameters:**

    1. query : a string of keywords.
    2. offset: the offset number of results, default is 0.
    3. limit: the maximum number of items returned, default is 20.

    **Response:**

      ```json
      {
          results:
          [
              id: 1234,
              content: {"A team Object": "Please see team documentation"}
          ]
      }
      ```

  * api/search/post

    This is the entry for post search function.

    **Requirements:**None.

    **Method:** GET

    **Parameters:**

    1. query : a string of keywords.
    2. offset: the offset number of results, default is 0.
    3. limit: the maximum number of items returned, default is 20.

    **Response:**

      ```json
      {
          results:
          [
              {
                  id: 1234,
                  content: {
                    postTitle: "Team Title",
                    tags: ["tag1","tag2"],
                  	content: "postContent"                 
                  }
              }
          ]
      }
      ```

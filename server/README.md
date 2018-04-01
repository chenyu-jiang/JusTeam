# JusTeam
## Client-Server Interfaces

* /api
    * /api/posts
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
            2. *isNew*: new post or draft
            3. *postID*: if not new post, the old postID must be submitted

            **Response**:
            ```json
            {
                "status": true,
                "postID": 12345
            }
            ```

        * api/posts/set-stat

          Set the status of the post (Draft/Final).

          **Requirements**: None.

          **Method**: GET

          **Parameters**:

          1. postID: id of the post that needs changing status

          **Response**:
          ```json
          {"status": true}
          ```

        * api/posts/attach_activity

          Attach a post to an activity.

          **Requirements**: TBA.

          **Method**: GET

          **Parameters**:

          1. postID: id of the post
          2. activityID: id of the activity

          **Response**:
          ```json
          {"status": true}
          ```

    * api/team

        * api/team/TeamOP

          * api/team/TeamOP/createTeam

            **Requirements**: None.

            **Method** : POST

            **Parameters**:

              1. userID : integer

              2. postForm : {introduction : string, teamTitle: string, maxMember : integer , category : string, status : string, reminder : string}

            **Response**: {state: 'success'/'fail', insertID: integer}

          * api/team/TeamOP/deleteTeam

            **Requirements**: None.

            **Method** : GET

            **Parameters**:

              1. teamID : integer // the ID of team which is going to be deleted

            **Response**:  {state : 'success' / 'fail'}

          * api/team/TeamOP/editTeam

            **Requirements**: None.

            **Method** : POST

            **Parameters**:

              1. a form contain all the information to change:
                {'teamID' : integer,'introduction' : string, 'teamTitle' : string, 'maxMember' = integer , 'category' : string, 'status' : 'string', 'reminder' : string}

            **Response**:  {state : 'success' / 'fail'}

          * api/team/TeamOP/addMember

            **Requirements**: None.

            **Method** : GET

            **Parameters**:

              1. teamID : integer

              2. newMember : integer // which is the userID to be added

            **Response**: {state : 'success' / 'fail'}

          * api/team/TeamOP/deleteMember

            **Requirements**: None.

            **Method** : GET

            **Parameters**:

              1. teamID : integer

              2. deletedMember : integer //which is the userID to be deleted

            **Response**: {state : 'success' / 'fail'}

          * api/team/TeamOP/editAuthority

            **Requirements**: None.

            **Method** : GET

            **Parameters**:

              1. userToChange : integer

              2. rightToChange : integer

              3. teamID : integer

            **Response**: {state : 'success' / 'fail'}

        * api/team/teamInfo

            * api/team/teamInfo/getRecommend    // warning : this part haven't been finished

              get team information for recommend usage

              **Requirements**: None.

              **Method** : GET

              **Parameters**: None

              **Response**:

            * api/team/teamInfo/getUserTeams

              **Requirements**: None.

              **Method** : GET

              **Parameters**:
                1. userID : integer

              **Response**: {state: 1 all are loaded / 0 not all are loaded, teams : array of team objects }

            * api/team/teamInfo/viewOneTeam

              **Requirements**: None.

              **Method** : GET

              **Parameters**:
                  1. teamID : integer;

              **Response**: {state : 'success'/'fail', team : teamObject}
    * api/

    * api/accounts

    * api/notifications

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

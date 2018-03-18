# JusTeam
Development of future software engineers.

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

    * api/teams

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


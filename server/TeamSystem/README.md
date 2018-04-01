JusTeam
==================================================================
TeamSystem
------------------------------------------------------------------
# introduction:

  This system is used to answer the call related to team from the client side

# modules:

*teamOperation*

* introduction : this part do the related work to team

    * definitions : note for the **status : string** we have *recruiting*, *fighting*, *finished*
                        for the **right : integer** we have  1  *common teammates*, 2  *have right to prove application or edit Team*, 3  *The owner of this team*
                        for the **category** we have *hiking*, *eating*, *studying*
                        for status we have *recruiting*, *fighting*, *finished*
    * fields:
    {
      category : string
      status : string
      reminder : string
      recentEditTime : datetime
      teamID : integer
      introduction : string
      teamTitle : string
      maxMember : integer
      launchTime : datetime
      memberList = {'num':0,'IDList':[],'right':[]};
      eventList = {'num':0,'IDList':[]};
    }

* functions:

  **createTeam**

      1. Parameters: Jason : {'introduction' : string, 'teamTitle' : string, 'maxMember' : integer , 'category' : string, 'status' : string , 'reminder' : string}

    2. Output: (err, result) result be the insertID of the new Team.

  **deleteTeam**

    1. Parameters: teamID : integer

    2. Output: (err, result)

  **editTeam**

    1. Parameters: {'teamID' : integer,'introduction' : string, 'teamTitle' : string, 'maxMember' = integer , 'category' : string, 'status' : string, 'reminder' : string}

    2. Output: (err, result)

  **askTeam**

    1. Parameters: teamID : integer

    2. Output: (err, teamObject, fields)

  **addMember**

    1. Parameters: Jason : {teamID: integer, userID: integer}

    2. Output: (err, result)

  **deleteMember**

    1. Parameters: Jason : {teamID: integer, userID: integer}

    2. Output: (err, result)

  **editAuthority**

    1. Parameters: Jason : {teamID: integer, userID: integer, newRight : integer}

    2. Output: (err, result)

  **teamAttachEvent**

    1. Parameters : Jason : {teamID : integer, eventID: integer}

    2. Output: (err, result)

  **teamDeleteEvent**

    1. Parameters : Jason : {teamID : integer, eventID: integer}

    2. Output : (err, result)

*eventOperation*

* introduction : this part do the related work to event


  **createEvent**

    1. Parameters : Jason : {'startTime' = string (data time), 'endTime' = string(data time), 'title' = string, 'location' = string, 'specification' = string}

    2. Output : insertID : integer

  **deleteEvent**

    1. Parameters : eventID : integer

    2. Output : insertID : integer

  **editEvent**

    1. Parameters : Jason : {'eventID' = integer,'startTime' = string(data time), 'endTime' = string(data time), 'title' = string, 'location' = string, 'specification' = string}

    2. Output : (err, result)

  **askEvent**

    1. Parameters : eventID : integer

    2. Output : (err, eventObject, fields)

  **postAttachEvent**

    1. Parameters : {'eventID': integer, 'postID': integer}

    2. Output : (err, result)

  **postDeleteEvent**

    1. Parameters : {'eventID': integer, 'postID': integer}

    2. Output : (err, result)

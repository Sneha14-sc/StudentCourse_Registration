"use strict";
exports.__esModule = true;
var Exchange = {
    Topics: [
        {
            TopicName: "STUDENT_ADD",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["STUDENT_ADDED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "STUDENT_ADD-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUDENT_ADDED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "STUDENT_ADDED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUDENT_UPDATE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["STUDENT_UPDATED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "STUDENT_UPDATE-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUDENT_UPDATED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "STUDENT_UPDATED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUDENT_DELETE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["STUDENT_DELETED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "STUDENT_DELETE-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUDENT_DELETED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "STUDENT_DELETED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "COURSE_ADD",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["COURSE_ADDED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "COURSE_ADD-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "COURSE_ADDED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "COURSE_ADDED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "COURSE_UPDATE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["COURSE_UPDATED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "COURSE_UPDATE-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "COURSE_UPDATED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "COURSE_UPDATED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "COURSE_DELETE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["COURSE_DELETED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "COURSE_DELETE-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "COURSE_DELETED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "COURSE_DELETED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "ADDRESS_ADD",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["ADDRESS_ADDED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "ADDRESS_ADD-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "ADDRESS_ADDED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "ADDRESS_ADDED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "ADDRESS_UPDATE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["ADDRESS_UPDATED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "ADDRESS_UPDATE-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "ADDRESS_UPDATED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "ADDRESS_UPDATED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "ADDRESS_DELETE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["ADDRESS_DELETED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "ADDRESS_DELETE-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "ADDRESS_DELETED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "ADDRESS_DELETED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUD_COURSE_ADD",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["STUD_COURSE_ADDED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "STUD_COURSE_ADD-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUD_COURSE_ADDED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "STUD_COURSE_ADDED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUD_COURSE_UPDATE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["STUD_COURSE_UPDATED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "STUD_COURSE_UPDATE-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUD_COURSE_UPDATED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "STUD_COURSE_UPDATED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUD_COURSE_DELETE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "IOT_SERVICE",
                    OnSuccessTopicsToPush: ["STUD_COURSE_DELETED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "STUD_COURSE_DELETE-IOT_SERVICE"
                },
            ]
        },
        {
            TopicName: "STUD_COURSE_DELETED",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "STUD_COURSE_DELETED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "ERROR_RECEIVER",
            Publishers: ["IOT_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "ERROR_RECEIVER-API_GATEWAY_SERVICE"
                },
            ]
        },
    ]
};
exports["default"] = Exchange;

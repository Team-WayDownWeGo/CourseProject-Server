'use strict';

module.exports = {
    competitionStatus: ['passed', 'ongoing', 'upcoming'],
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 50,
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 50,
    MIN_COMPETITION_PLACE_LENGTH: 3,
    MAX_COMPETITION_PLACE_LENGTH: 50,
    MIN_CATEGORY_LENGTH: 3,
    MAX_CATEGORY_LENGTH: 50,
    MIN_DESCRIPTION_LENGTH: 3,
    MAX_DESCRIPTION_LENGTH: 200,
    MIN_POINTS: 5,
    MAX_POINTS: 100,
    MIN_LEVEL_LENGTH: 3,
    MAX_LEVEL_LENGTH: 30,
    MIN_LINK_LENGTH: 3,
    MAX_LINK_LENGTH: 50,
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 50,
    MIN_FORUM_TITLE_LENGTH: 3,
    MAX_FORUM_TITLE_LENGTH: 50,
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    NAME_REGEX: /^[A-Z]([a-z]?)+$/,
    USERNAME_REGEX: /^[a-zA-Z0-9]+/g,
    MIN_ROLE_LENGTH: 5,
    MAX_ROLE_LENGTH: 10,
    MIN_FORUM_POST_ANSWER_LENGTH: 3,
    MAX_FORUM_POST_ANSWER_LENGTH: 300,
    ORGANIZATOR_MINIMALPOINTS: 2000,
    MIN_MESSAGE_LENGTH: 3,
    MAX_MESSAGE_LENGTH: 300
};
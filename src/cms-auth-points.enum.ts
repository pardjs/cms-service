import { SERVICE_NAME } from "./constants";

export enum CMSAuthPointsDisplayNames {
    FIND_ARTICLES = 'find articles',
    FIND_ONE_ARTICLE = 'find article by id',
    CREATE_ARTICLE = 'create an article',
    UPDATE_ARTICLE = 'update article by id',
    REMOVE_ARTICLE = 'remove article by id',

    FIND_CATEGORIES = 'find categories',
    FIND_ONE_CATEGORY = 'find category by id',
    CREATE_CATEGORY = 'create category',
    UPDATE_CATEGORY = 'update category by id',
    REMOVE_CATEGORY = 'remove category by id',

    FIND_TAGS = 'find tags',
    FIND_ONE_TAG = 'find tag by id',
    CREATE_TAG = 'create tag',
    UPDATE_TAG = 'update tag by id',
    REMOVE_TAG = 'remove tag by id',

    UPLOAD = 'upload media to oss',

    PUBLISH = 'publish all content to oss',
}

export enum CMSAuthPointsNames {
    FIND_ARTICLES = 'CMS_SERVICE-FIND_ARTICLES',
    FIND_ONE_ARTICLE = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    CREATE_ARTICLE = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    UPDATE_ARTICLE = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    REMOVE_ARTICLE = 'CMS_SERVICE-FIND_ONE_ARTICLE',

    FIND_CATEGORIES = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    FIND_ONE_CATEGORY = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    CREATE_CATEGORY = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    UPDATE_CATEGORY = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    REMOVE_CATEGORY = 'CMS_SERVICE-FIND_ONE_ARTICLE',

    FIND_TAGS = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    FIND_ONE_TAG = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    CREATE_TAG = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    UPDATE_TAG = 'CMS_SERVICE-FIND_ONE_ARTICLE',
    REMOVE_TAG = 'CMS_SERVICE-FIND_ONE_ARTICLE',

    UPLOAD = 'CMS_SERVICE-FIND_ONE_ARTICLE',

    PUBLISH = 'CMS_SERVICE-FIND_ONE_ARTICLE',
}

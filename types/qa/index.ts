export type Question = {
    qid: string;
    qCreator: string;
    // q_anonymousFlag: boolean;
    q_created: string;
    q_lastUpdated: string;
    qTitle: string;
    qDesc: string;
    voteCount: number;
    selectedTags: Default_Tag[];
    q_fileName: string;
    q_fileLink: string;
    answers: Answer[];
    q_comments: Question_Comment[];
};

export type Default_Tag = {
    tagId: number;
    tagKey: number;
};

export type Answer = {
    answerId: number;
    ansCreator: string;
    // ans_anonymousFlag: boolean;
    ans_created: string;
    ans_lastUpdated: string;
    answerDesc: string;
    ans_fileName: string;
    ans_fileLink: string;
    ans_comments: Answer_Comment[];
};

export type Answer_Comment = {
    ans_commentId: number;
    ansMentCommentor: string;
    // ans_ment_anonymousFlag: boolean;
    ans_ment_created: string;
    ans_ment_lastUpdated: string;
    ans_comment: string;
    // ans_ment_positiveFlag: boolean;
    // ans_ment_negativeFlag: boolean;
};

export type Question_Comment = {
    ans_commentId: number;
    ansMentCommentor: string;
    // ans_ment_anonymousFlag: boolean;
    ans_ment_created: string;
    ans_ment_lastUpdated: string;
    ans_comment: string;
    // ans_ment_positiveFlag: boolean;
    // ans_ment_negativeFlag: boolean;
};

// export interface GetQuestions {
//     questions: Question[];
// }

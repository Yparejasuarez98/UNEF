export interface Votes {
    votes_total_default: number;
    vote_remaining: number;
    vote_register_total: number;
    vote_delegate: number;
    name: string;
    section: string;
}

export interface Vowel {
    name: string;
    nif: string;
}

export interface AsignVote {
    round: number;
    nif: string;
    votes_quantity: number;
}
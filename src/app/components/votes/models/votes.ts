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
    nif_vowel: string;
}

export interface AsignVote {
    round: number;
    nif_vowel: string;
    votes_quantity: number;
}
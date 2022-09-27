export interface CreateWatchlist {
    media_type: 'movie';
    media_id: number;
    watchlist: boolean;
}

export interface ResponseWatchlist {
    success: boolean,
    status_code: number,
    status_message: string
}

const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const query = {
      text: `SELECT playlists.id AS playlist_id, playlists.name AS playlist_name,
            users.username, songs.id AS song_id, songs.title, songs.performer
            FROM playlists
            INNER JOIN users ON playlists.owner = users.id
            LEFT JOIN playlists_songs ON playlists.id = playlists_songs.playlist_id
            LEFT JOIN songs ON playlists_songs.song_id = songs.id
            WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlist = {
      id: result.rows[0].playlist_id,
      name: result.rows[0].playlist_name,
      songs: result.rows
        .filter((row) => row.song_id) // Filter out rows where song_id is null
        .map((row) => ({
          id: row.song_id,
          title: row.title,
          performer: row.performer,
        })),
    };

    return playlist;
  }
}

module.exports = PlaylistsService;

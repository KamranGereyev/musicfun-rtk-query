import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types.ts";

type PlayListItemProps = {
    playlist: PlaylistData
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlist: PlaylistData | null) => void
}

export const PlayListItem = ({playlist, deletePlaylistHandler, editPlaylistHandler}: PlayListItemProps) => {
    return (
        <div>
            <div>description: {playlist.attributes.description}</div>
            <div>userName: {playlist.attributes.user.name}</div>
            <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
            <button onClick={() => editPlaylistHandler(playlist)}>update</button>
        </div>
    )
}
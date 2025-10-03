import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types.ts";
import {PlayListCover} from "@/features/playlists/ui/PlayListItem/PlayListCover/PlayListCover.tsx";
import {PlayListDescription} from "@/features/playlists/ui/PlayListItem/PlayListDescription/PlayListDescription.tsx";

type PlayListItemProps = {
    playlist: PlaylistData
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlist: PlaylistData | null) => void
}

export const PlayListItem = ({playlist, deletePlaylistHandler, editPlaylistHandler}: PlayListItemProps) => {
    return (
        <div>
            <PlayListCover
                playlistId={playlist.id}
                images={playlist.attributes.images}
            />
            <PlayListDescription
                attributes={playlist.attributes}
            />
            <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
            <button onClick={() => editPlaylistHandler(playlist)}>update</button>
        </div>
    )
}
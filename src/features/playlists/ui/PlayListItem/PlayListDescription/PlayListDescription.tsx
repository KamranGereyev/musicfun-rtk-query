import type {PlaylistAttributes} from "@/features/playlists/api/playlistsApi.types.ts";

type PlayListItemProps = {
    attributes: PlaylistAttributes
}
export const PlayListDescription = ({attributes}:PlayListItemProps) => {
    return (
        <div>
            <div>title: {attributes.title}</div>
            <div>description: {attributes.description}</div>
            <div>userName: {attributes.user.name}</div>
        </div>
    )
}
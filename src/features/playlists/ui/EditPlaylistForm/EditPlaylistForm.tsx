import {type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister} from "react-hook-form";
import type {UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";
import {useUpdatePlaylistMutation} from "@/features/playlists/api/playListApi.ts";

type EditPlaylistFormProps = {
    playlistId: string | null
    setPlaylistId: (playlistId: null) => void
    editPlaylist: (playlistId: null) => void
    register: UseFormRegister<UpdatePlaylistArgs>
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
}

export const EditPlaylistForm = ({playlistId, setPlaylistId, editPlaylist, register, handleSubmit}: EditPlaylistFormProps) => {

    const [updatePlaylist] = useUpdatePlaylistMutation()

    const onSubmit: SubmitHandler<UpdatePlaylistArgs> = body => {
        if(!playlistId) return
        updatePlaylist({playlistId, body}).then(() => {
            setPlaylistId(null)
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'} />
            </div>
            <div>
                <input {...register('description')} placeholder={'description'} />
            </div>
            <button type={'submit'}>save</button>
            <button type={'button'} onClick={() => editPlaylist(null)}>
                cancel
            </button>
        </form>
    )
}
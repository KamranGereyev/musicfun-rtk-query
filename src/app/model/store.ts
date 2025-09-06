import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import {playListsApi} from "@/features/playlists/api/playListApi.ts";

export const store = configureStore({
    reducer: {
        [playListsApi.reducerPath]: playListsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(playListsApi.middleware),
})

setupListeners(store.dispatch)
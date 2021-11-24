import { configureStore } from '@reduxjs/toolkit'
import configSlice from './configSlice'
import threeCommasSlice from './threeCommas/threeCommasSlice'


const store = configureStore({
  reducer: {
    config: configSlice,
    threeCommas: threeCommasSlice
  },
  devTools​: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
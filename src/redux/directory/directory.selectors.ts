import { createSelector } from 'reselect';

const selectDirectory = (state: any) => state.directory;

export const selectDirectorySection = createSelector(
  [selectDirectory],
  (directory) => directory.directory
);

export const selectIsDirectoryFetching = createSelector(
  [selectDirectory],
  (directory) => directory.isFetching
);

export const selectIsDirectoryLoaded = createSelector(
  [selectDirectory],
  (directory) => !!directory.directory
);

import { HTTPRequestStatus } from "@enum/http-request-status.enum";
import { createSelector } from "@ngrx/store";
import { selectStatus } from "../reducers/search.reducers";

export const selectSearchIsLoading = createSelector(selectStatus, (status) => status === HTTPRequestStatus.pending)
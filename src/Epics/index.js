import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, tap, retry, filter, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure, changeSearchField } from '../Reducers/Reducers';
import { of } from 'rxjs';

export const changeSearchEpic = action$ => action$.pipe(
    ofType(changeSearchField.type),
    map(o => o.payload.trim()),
    filter(o => o !== ''),
    debounceTime(100),
    map(o => searchSkillsRequest(o))
)

export const searchSkillsEpic = action$ => action$.pipe(
    ofType(searchSkillsRequest.type),
    map(o => o.payload),
    map(o => new URLSearchParams({ q: o })),
    tap(o => console.log(o)),
    switchMap(o => ajax.getJSON(`${process.env.REACT_APP_SEARCH_URL}?${o}`).pipe(
        retry(3),
        map(o => searchSkillsSuccess(o)),
        catchError(e => of(searchSkillsFailure(e))),
    )),
);
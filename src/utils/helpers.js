import { switchMap, catchError } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { of } from 'rxjs';

export default function rxFetch(url) {
  return fromFetch(url).pipe(
    switchMap(response => {
      if (response.ok) {
        return response.json();
      } else {
        return of({ error: true, message: `Error ${response.status}` });
      }
    }),
    catchError(error => {
      console.log(error);
      return of({ error: true, message: error.message });
    })
  );
}

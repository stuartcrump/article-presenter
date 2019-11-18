import { Observable } from 'rxjs';

export default function rxFetch(url) {
  return Observable.create(observer => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });
}

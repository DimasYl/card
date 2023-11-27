import {Injectable} from "@angular/core";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable()
export class HandlerService {

  public requestErrorsAndRetry<T>(request: Observable<T[]>): Observable<T[]> {
    return request.pipe(
      catchError((error) => {
        console.log(`Ошибка: ${error}`);
        return throwError(error);
      }),
      retry(1))
  }

}

import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable, signal } from '@angular/core'
import { environment as env } from './../../environments/environment.development'
import { catchError, map, Observable, of, startWith, tap } from 'rxjs'
import { toSignal } from '@angular/core/rxjs-interop'
import { ResponseWeather, Weather } from './weather.model'

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient)

  private weatherResult$: Observable<ResponseWeather> = this.http
    .get<any>(
      `${env.openWeather.url}lat=50.298&lon=18.677&appid=${env.openWeather.apiKey}`
    )
    .pipe(
      tap((data) => console.log('Data: ', JSON.stringify(data))),
      map(
        (data) =>
          ({
            data: data,
            loading: false,
            errorMessage: '',
          }) as ResponseWeather
      ),
      startWith({ data: {} as Weather, loading: true, errorMessage: '' }),
      catchError((err) =>
        of({
          data: {},
          loading: false,
          errorMessage: `Server returned code: ${err.status}, error message is: ${err.statusText}`,
        } as ResponseWeather)
      )
    )

  private weatherResult = toSignal(this.weatherResult$, {
    initialValue: { data: {} as Weather, loading: false, errorMessage: '' },
  })

  weather = computed(() => this.weatherResult().data)
  loading = computed(() => this.weatherResult().loading)
  errorMessage = computed(() => this.weatherResult().errorMessage)
}

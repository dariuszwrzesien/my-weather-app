import { NgIf } from '@angular/common'
import { WeatherService } from './weather.service'
import { Component, inject, effect } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  standalone: true,
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  imports: [NgIf, MatCardModule, MatProgressSpinnerModule],
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  weatherService = inject(WeatherService)

  weather = this.weatherService.weather
  isLoading = this.weatherService.loading
  errorMessage = this.weatherService.errorMessage

  constructor() {
    effect(() => {
      console.log(`Loading data: ${this.isLoading()}`)
    })
  }
}

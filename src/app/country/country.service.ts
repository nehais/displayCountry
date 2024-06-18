import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';
import { HttpClient } from '@angular/common/http'
import { environment

 } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class CountryService {
  apiUrl : string = '';

  constructor(private http: HttpClient) { }

  getAllCountries () : Observable<Country[]>{
    this.apiUrl = environment.apiURL + 'all';
    return this.http.get<Country[]>(this.apiUrl);
  }

  getCountryDetails (countryCode : string) : Observable<Country[]>{
    this.apiUrl = environment.apiURL + 'alpha/' + countryCode;
    return this.http.get<Country[]>(this.apiUrl);
  }
}

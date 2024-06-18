import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { CountryService } from '../country.service';
import { Observable, Subject, forkJoin, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})

export class CountryListComponent implements OnInit, OnDestroy{
  countryList$ : Country[] = [];
  allCountryList$ : Observable <Country[]> | undefined;
  countryDetails$ : Country[] = [];
  selectedCountry : string = '';
  selectError : boolean = false;
  unsubscribe$ = new Subject<void>();

  constructor(private countryService : CountryService){}
  
  ngOnInit(): void {
    let oldSelectedCountry = localStorage.getItem("countrySelected");
    this.selectedCountry = oldSelectedCountry ? JSON.parse(oldSelectedCountry) : '';

    this.allCountryList$ = this.countryService.getAllCountries();
    /*this.countryService.getAllCountries().subscribe(data =>{
      this.countryList$ = data;
      this.selectedCountry = data[0].cca2;
    })
    this.countryService.getCountryDetails(this.selectedCountry).subscribe(data =>{
      this.countryDetails$ = data;
    });*/
    /*this.countryService.getAllCountries()
    .pipe(
      switchMap(data => {
        this.countryList$ = data;
        this.selectedCountry = data[0].cca2;
        return this.countryService.getCountryDetails(this.selectedCountry);
      })
    )
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data =>{
      this.countryDetails$ = data;
    });*/
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCountryDetails (){
    if(!this.selectedCountry){
      this.selectError = true;
      return;
    }

    this.countryService.getCountryDetails(this.selectedCountry)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data =>{
      this.countryDetails$ = data;
    });

    localStorage.setItem("countrySelected", JSON.stringify(this.selectedCountry));
  }

  reset(){
    this.selectError = false;
    this.countryDetails$ = [];
  }
}

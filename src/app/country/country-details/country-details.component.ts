import { Component, Input } from '@angular/core';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})

export class CountryDetailsComponent {
@Input()
  countryDetails: Country[] =[];

  displayedColumns = ['name', 'cca2', 'population', 'unMember', 'languages', 'flag']

  getLanguages(languages : string []) : string{
    let languagesSpoken : string = '';

    for (let language in languages){
      if (languagesSpoken){
        languagesSpoken += ', ';
      }

      languagesSpoken += languages[language];
    }

    return languagesSpoken;
  }
}

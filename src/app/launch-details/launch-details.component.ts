import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { LaunchDetailsGQL } from '../services/spacexGraphql.service';

@Component({
  selector: 'app-launch-details',
  templateUrl: './launch-details.component.html',
  styleUrls: ['./launch-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL
    // our qraphql query takes an ID as its argument 
    // and we get that id from the url in browser
    // angular provides all of the url parameters as an observable which we can access
    // access on the activated route per a map/ when we have taht obser.. we want to switch to an
    // observable of the actual data from graphql that's a perfect use case for the 
    // rxjs switch map operator, in other words, onec we have the ID parameter from
    // the URL we'll go ahead and switch to another observable which in this case is the
    // launch detail service fetch of that specific ID
  ) {}

  launchDetails$ = this.route.paramMap.pipe(
    map((params) => params.get('id') as string),
    switchMap((id) => this.launchDetailsService.fetch({ id })),
    map((res) => res.data.launch)
  );
}

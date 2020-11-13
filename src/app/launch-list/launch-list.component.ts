import { MissionsListGQL } from './../services/spacexGraphql.service';
import { Routes, ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { PastLaunchesListGQL, Mission } from '../services/spacexGraphql.service';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchListComponent {

  constructor(
    private readonly pastLaunchesService: PastLaunchesListGQL,
    private readonly missionService: MissionsListGQL,
    private readonly route: ActivatedRoute
        ) {}
// first have create query in .qraphql and then run npm codegen
// then we can fine our data in pipe
  pastLaunches$ = this.pastLaunchesService
    // Please be care to not fetch too much, but this amount lets us see the img lazy loading in action
    .fetch({ limit: 30 })
    // here we extract our query data
    // we can also get info like errors or loading state from res/ and do the pipe and in the map operator extract the data we
    .pipe(map((res) => res.data.launchesPast));

      missions$ = this.missionService.fetch({ limit: 10 })
      .pipe(
        map(res => res.data.missions)
      );
}

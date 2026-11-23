import { Routes } from '@angular/router';
import { UserPage } from './pages/user-page/user-page';
import { LicensePage } from './pages/license-page/license-page';
import { ZonePage } from './pages/zone-page/zone-page';
import { ForecastPage } from './pages/forecast-page/forecast-page';
import { SeaReportPage } from './pages/sea-report-page/sea-report-page';
import { SpotPage } from './pages/spot-page/spot-page';
import { MeetupPage } from './pages/meetup-page/meetup-page';
import { AdPage } from './pages/ad-page/ad-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

export const routes: Routes = [
    {path: 'users', component: UserPage},
    {path: 'licenses', component: LicensePage},
    {path: 'zones', component: ZonePage},
    {path: 'forecasts', component: ForecastPage},
    {path: 'sea-reports', component: SeaReportPage},
    {path: 'spots', component: SpotPage},
    {path: 'meetups', component: MeetupPage},
    {path: 'ads', component: AdPage},
    {path: '', pathMatch: 'full', redirectTo: '/users'},
    {path: '**', component: NotFoundPage},
];

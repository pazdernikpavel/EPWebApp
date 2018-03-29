import { NotifyService } from './../_services/notify.service';
import { ResourceForScheduler } from './../_models/resource/resourceForScheduler';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResourceService } from './../_services/resource.service';
import { ResourceAllocations } from './../_models/resource/resourceAllocations';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DxSchedulerModule } from 'devextreme-angular';
import { AdaptService } from '../_services/adapt.service';
import { FilterService } from '../_services/filter.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  adaptOptions: any;
  searchParams: any;
  resourceDetail: ResourceForScheduler;
  productionGroupInfo: any;
  resAllocs: ResourceAllocations[] = [];
  searchDate: Date = new Date();

  constructor(

    private resourceService: ResourceService,
    private adaptService: AdaptService,
    private route: ActivatedRoute,
    private router: Router,
    private filterService: FilterService,
    private notifyService: NotifyService) {

    this.searchParams = this.getSearchParams();
    this.resourceService
      .getResAllocsForGivenResource(this.searchParams.resource)
      .subscribe(res => {
        this.setResAlloc(res);
      }, err => {
        this.notifyService.error("Error occured. Please try again.");
      });
    this.resourceService
      .getProductionGroup(this.searchParams.productionGroup)
      .subscribe(res => { 
        this.productionGroupInfo = res;
      }, err => {
        this.notifyService.error("Error occured. Please try again.");
      });
    this.resourceService
      .getResourceDetailById(this.searchParams.resource)
      .subscribe(res => {
        this.resourceDetail = res;
      }, err => {
        this.notifyService.error("Error occured. Please try again.");
      });
    this.adaptService.adapt$.subscribe(item => {
      this.adaptOptions = this.adaptService.getOptionsForAdaptation(item);
    });
  }

  ngOnInit() {
    this.adaptation();
    this.searchDate = this.searchParams.date;
  }

  OnDestroy() {
    this.resAllocs = [];
    this.searchParams = {};
    this.adaptOptions = {};
  }

  /* gets search parameters from URL */
  getSearchParams() {
    let result: any;
    this.route.params.subscribe((params: Params) => {
      result = params;
    });

    if (!result.date)
      result.date = new Date();

    return {
      productionGroup: Number(result.productionGroup),
      resource: Number(result.resource),
      date: new Date(result.date)
    }
  }

  /* changes adaptOptions based on screen size */
  adaptation() {
    this.adaptService.setAdaptValue();
  }

  /* return back to search component + sends back search parameters */
  searchAgain() {
    let sendParams = this.searchParams;
    sendParams.date = this.filterService.getFormatDate(sendParams.date);
    sendParams.searchAgain = true;
    this.router.navigate(["search", sendParams]);
  }

  /* Creates custom appointment detail - to be done*/
  onAppointmentFormCreated (e) {
    var form = e.form;
  }

  /* Iterates over objects returned from server, remaps all the objects from server model to the client model and stores them into resAllocs variable */
  private setResAlloc(data: any[]) {
    for (let resAlloc of data) {
      let resAllocFromApi: ResourceAllocations = {
        resAllocId: resAlloc.id,
        resourceId: resAlloc.resourceId,
        text: resAlloc.name,
        startDate: resAlloc.start,
        endDate: resAlloc.end
      };
      this.resAllocs.push(resAllocFromApi);
    }
  };

}
import { ProductionGroupForFilter } from './../_models/productionGroup/productionGroupForFilter';
import { ResourceForScheduler } from './../_models/resource/resourceForScheduler';
import { ResourceAllocations } from './../_models/resource/resourceAllocations';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

/* Service which is responsible for providing information to the scheduler based on information from search params sent via search form */
@Injectable()
export class ResourceService {

    baseUrl = environment.apiUrl;

    constructor(private authHttp: HttpClient) {}

    getResAllocsForGivenResource(resourceId: number) {
        return this.authHttp.get<ResourceAllocations[]>(this.baseUrl + "ResourceAllocation/" + resourceId);
    }

    getResourceDetailById(resourceId: number) {
        return this.authHttp.get<ResourceForScheduler>(this.baseUrl + "resource/" + resourceId);
    }

    getProductionGroup(resourceGroupId: number) {
        return this.authHttp.get<ProductionGroupForFilter>(this.baseUrl + "ResourceGroup/" + resourceGroupId);
    }
}
import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { baseURL } from '../shared/baseurl';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import  { Restangular } from 'ngx-restangular';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(  private restangular : Restangular, private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getLeaders():Observable<Leader[]>{
   return this.restangular.all('leaders').getList();
    
    
  }
   getLeader(id:number):Observable<number>{
    return this.restangular.one('leaders',id).get();

    
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured:true}).pipe(map(leaders=>leaders[0]));

 
  }
 /*  getLeaderIds(): Observable<number[] | any> {
    return this.getLeaders().pipe(map(Leaders => Leaders.map(dish => Leader.id)))
    .pipe(catchError(error=>error));
} */
}

 
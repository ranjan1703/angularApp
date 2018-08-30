import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor( private http: HttpClient) { }
  
  getLeaders():Observable<Leader>{
   return this.http.get<Leader>(baseURL + 'leaders');
    
    
  }
   getLeader():Observable<number[] | any>{
    return this.getLeader().pipe(map(leaders=>leaders.map(leader=>leader.id)));

    
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders=>leaders[0]));

 
  }
}

 
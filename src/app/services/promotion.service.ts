import { Injectable} from '@angular/core';
import { Promotion } from '../shared/promotion';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';

import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }
  
  
  
  getPromotions(): Observable<Promotion>{
   return this.http.get<Promotion>(baseURL + 'promotions');
   }
  getPromotion(): Observable<number[] | any>{
    return this.getPromotion().pipe(map(promotions=>promotions.map(promotion=>promotion.id)));
   }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions =>promotions[0]));
  
    }
}

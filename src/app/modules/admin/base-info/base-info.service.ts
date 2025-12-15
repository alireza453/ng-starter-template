import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
    BaseInfoDto,
    CreateBaseInfoDto,

    GetBaseInfoCategoriesDto,
    GetBaseInfoDto,
} from './base-info.types';
import { TreeNode } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class BaseInfoService {
    constructor(private _http: HttpClient) {}

    //========= Categories =========
    /**
     * Get Categories
     */
    getCategories(): Observable<GetBaseInfoCategoriesDto> {
        return this._http.get<GetBaseInfoCategoriesDto>(
            `${environment.BASE_API}/app/base-info-category`
        );
    }
    addCategory(body:{name:string,display:string}): Observable<GetBaseInfoCategoriesDto> {
        return this._http.post<GetBaseInfoCategoriesDto>(
            `${environment.BASE_API}/app/base-info-category`,
            body
        );
    }






    //========= BaseInfo =========
    /**
     * Add Base Info
     * @param body
     */
    addBaseInfo(body: CreateBaseInfoDto): Observable<BaseInfoDto> {
        return this._http.post<any>(
            `${environment.BASE_API}/app/base-info`,
             body
        );
    }

    /**
     * Update Base Info
     * @param body
     */
    editBaseInfo(body: CreateBaseInfoDto): Observable<BaseInfoDto> {
        return this._http.put<any>(
            `${environment.BASE_API}/app/base-info`,
            body
        );
    }


    /**
     * Delete Base Info
     * @param id
     */
    deleteBaseInfo(id: string): Observable<any> {
        return this._http.delete<any>(
            `${environment.BASE_API}/app/base-info/${id}`
        );
    }

    /**
     * Delete Base Info
     * @param id
     */
    deleteBaseInfoCategory(id: string): Observable<any> {
        return this._http.delete<any>(
            `${environment.BASE_API}/app/base-info-category/${id}`
        );
    }

    /**
     * Get BaseInfo
     */
    getBaseInfo(): Observable<GetBaseInfoDto> {
        return this._http.get<GetBaseInfoDto>(
            `${environment.BASE_API}/app/base-info`
        );
    }

     getBaseInfoData() {
       return  forkJoin({
            categories: this.getCategories(),
            baseInfos: this.getBaseInfo(),
        })
            .pipe(
                map(({ categories, baseInfos }):TreeNode[] => {
                    return categories['items'].map((catItem):TreeNode => ({
                        key: catItem.id,
                        label: catItem.display,
                        data: {name:catItem.name},
                        type: 'parent',
                        children: baseInfos['items']
                            .filter(
                                (baseItem) => baseItem.categoryId === catItem.id
                            )
                            .map((s):TreeNode => ({
                                key: s.id,
                                label: s.display,
                                data: {name:s.name},
                                type: 'child',
                            })),
                    }));
                })
            )
    }
}

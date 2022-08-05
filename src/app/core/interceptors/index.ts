import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";
import { CacheInterceptor } from "./cache/cache.interceptor";
import { FruitToPhotoInterceptor } from "./fruit-to-photo/fruit-to-photo.interceptor";
import { FruityProxyInterceptor } from "./fruity-proxy/fruity-proxy.interceptor";
import { FruityviceMockApiInterceptor } from "./fruityvice-mock-api/fruityvice-mock-api.interceptor";
import { LoaderInterceptor } from "./loader/loader.interceptor";
import { ManageHttpInterceptor } from "./manage-http/manage-http.interceptor";

export const interceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true,
  },
  /*{
    provide: HTTP_INTERCEPTORS,
    useClass: FruityviceMockApiInterceptor,
    multi: true,
  },*/
  {
    provide: HTTP_INTERCEPTORS,
    useClass: FruityProxyInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: FruitToPhotoInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ManageHttpInterceptor,
    multi: true,
  },
];

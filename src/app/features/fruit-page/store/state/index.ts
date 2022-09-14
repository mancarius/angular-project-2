import { HTTPRequestStatus } from '../../../../shared/enums/http-request-status.enum';
import { Fruit } from "@type/fruit"

export interface fruitPageState {
  fruit: Fruit | null;
  status: HTTPRequestStatus;
  error: string;
}

export const initialFruitPageState: fruitPageState = {
  fruit: null,
  status: HTTPRequestStatus.pristine,
  error: null
}